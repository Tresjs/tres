import { float, renderOutput } from 'three/tsl'
import type { Node } from 'three/webgpu'
import type { ComponentInternalInstance, VNode } from 'vue'
import { isVNode } from 'vue'
import type { ComposedEffect, EffectCreateState, EffectStage } from './context'

export function orderEffectsBySlot(root: VNode | null | undefined, effects: Iterable<ComposedEffect>): ComposedEffect[] {
  const byInstance = new Map<ComponentInternalInstance, ComposedEffect>()
  for (const effect of effects) { byInstance.set(effect.instance, effect) }

  const ordered: ComposedEffect[] = []
  const visit = (vnode: VNode | null | undefined) => {
    if (!vnode) { return }
    if (vnode.component) {
      const effect = byInstance.get(vnode.component)
      if (effect) { ordered.push(effect) }
      visit(vnode.component.subTree)
      return
    }
    if (vnode.suspense) {
      visit(vnode.suspense.activeBranch)
      return
    }
    if (Array.isArray(vnode.children)) {
      for (const child of vnode.children) {
        if (isVNode(child)) { visit(child) }
      }
    }
  }
  visit(root)
  return ordered
}

export const isSameOrder = (a: readonly ComposedEffect[], b: readonly ComposedEffect[]) =>
  a.length === b.length && a.every((effect, index) => effect === b[index])

export const hasLdrBeforeHdr = (effects: readonly ComposedEffect[]) => {
  const firstLdr = effects.findIndex(effect => effect.stage === 'ldr')
  return firstLdr !== -1 && effects.slice(firstLdr).some(effect => effect.stage === 'hdr')
}

export interface BuiltOutput {
  output: Node
  /** The value for `renderPipeline.outputColorTransform`. */
  outputColorTransform: boolean
}

// HDR effects, then `renderOutput()`, then LDR effects. Each stage keeps slot order.
export function buildOutput(input: Node, effects: readonly ComposedEffect[], state: Omit<EffectCreateState<unknown>, 'uniforms'>): BuiltOutput {
  const chain = (node: Node, stage: EffectStage) => effects
    .filter(effect => effect.stage === stage)
    .reduce((current, effect) => effect.create(current, { ...state, uniforms: effect.uniforms }), node)

  const hdr = chain(input, 'hdr')
  if (!effects.some(effect => effect.stage === 'ldr')) {
    return { output: hdr, outputColorTransform: true }
  }
  // No arguments: with `outputColorTransform` off, three reads the renderer's tone mapping and color space from the pipeline context.
  return { output: chain(renderOutput(hdr), 'ldr'), outputColorTransform: false }
}

// three gives each node an increasing `id`, so nodes with a higher id than this one did not exist before the call.
export const nextNodeId = () => float(0).id + 1

// No visited set in `Node.traverse`: a node used twice (`input.add(blur(input))`) would be walked twice.
function collectNodes(root: Node | undefined, into = new Set<Node>()) {
  if (!root || into.has(root)) { return into }
  into.add(root)
  for (const child of root.getChildren()) { collectNodes(child as Node, into) }
  return into
}

// Only nodes a build created are owned, so a module-scope node or the scene pass is never disposed.
export function collectOwnedNodes(output: Node, firstId: number, previous: ReadonlySet<Node>, keep: Iterable<Node | undefined>) {
  const owned = new Set<Node>()
  for (const node of collectNodes(output)) {
    if (node.id >= firstId || previous.has(node)) { owned.add(node) }
  }
  for (const node of keep) {
    if (node) { owned.delete(node) }
  }
  return owned
}

// Frees the render targets of replaced nodes (`BloomNode`, blurs).
export function disposeUnused(previous: ReadonlySet<Node>, next: ReadonlySet<Node>) {
  for (const node of previous) {
    if (!next.has(node)) { node.dispose() }
  }
}
