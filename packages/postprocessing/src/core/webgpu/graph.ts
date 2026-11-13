import { float } from 'three/tsl'
import type { Node } from 'three/webgpu'
import type { ComponentInternalInstance, VNode } from 'vue'
import { isVNode } from 'vue'
import type { ComposedEffect, EffectCreateState } from './context'

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

export function buildOutput(input: Node, effects: readonly ComposedEffect[], state: Omit<EffectCreateState<unknown>, 'uniforms'>): Node {
  return effects.reduce((node, effect) => effect.create(node, { ...state, uniforms: effect.uniforms }), input)
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
