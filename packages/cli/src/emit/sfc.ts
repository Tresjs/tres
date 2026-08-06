import type { GLTFIR, IRNode } from '../gltf/ir'
import type { InstancePlan } from './instancing'
import { contextKey, emitInstancesSFC } from './instances'
import { NO_INSTANCING, planInstancing } from './instancing'
import { access, declarer, header, importable, INDENT, modelTypes, round, tuple } from './shared'

export interface EmitOptions {
  /** What the component passes to `useGLTF`. */
  url: string
  /** Component name, used for the injection key and the error a stray model throws. */
  name?: string
  /** `named` slots only author-given names, `all` slots everything, `none` slots nothing. */
  slots?: 'named' | 'all' | 'none'
  shadows?: boolean
  /** Keep pass-through groups that carry nothing but nesting. */
  keepGroups?: boolean
  /** Keep `name` attributes on the emitted elements. */
  keepNames?: boolean
  /** Generate from this subtree instead of the scene root. */
  root?: string
  /** Fractional digits kept on transform values. */
  precision?: number
  /** Emit glTF extras as `:user-data`. */
  meta?: boolean
  /** Collapse meshes that share a geometry+material pair into an `InstancedMesh` batch. */
  instance?: boolean
  /** Batch every eligible mesh, including the ones that appear once. */
  instanceAll?: boolean
  /** Import specifier for the emitted provider, when instancing. */
  instancesModule?: string
  /** Recorded in the header so regeneration is reproducible. */
  command?: string
}

export interface EmitResult {
  code: string
  /** The provider half, when instancing produced one. Written beside `code`. */
  instances?: string
  /** Slot names the parent can override. */
  slots: string[]
  warnings: string[]
}

/**
 * Names an exporter invented rather than a human chose. Slotting these produces
 * meaningless override points, so `--slots named` filters them out.
 *
 * The second group is the well-known wrapper names: those survive pruning because
 * they carry the exporter's axis-correction transform, so the pattern has to name
 * them explicitly.
 */
const EXPORTER_NAME = new RegExp(
  `^(?:(?:object|mesh|node|group|primitive|geometry|material|scene)[-_]?\\d*`
  + `|sketchfab_model|rootnode|root|armature|empty|correction_?matrix)$`,
  'i',
)

/** Tells a class worth importing from three apart from `number` or a tuple literal. */
const THREE_CLASS = /^[A-Z]\w*$/

/** A `<slot>` binding and the type an override sees for it. */
interface SlotBinding {
  key: string
  expr: string
  type: string
}

interface SlotSpec {
  name: string
  bindings: SlotBinding[]
}

function isLight(node: IRNode): boolean {
  return node.type.endsWith('Light')
}

function isCamera(node: IRNode): boolean {
  return node.type.endsWith('Camera')
}

/**
 * Lights, cameras and bones have no faithful element form: their props live on the
 * parsed object, and a bone must BE the object for skinning to work. Pass them
 * through untouched rather than approximating them.
 */
function isPassthrough(node: IRNode): boolean {
  return isLight(node) || isCamera(node) || node.type === 'Bone'
}

function isContainer(node: IRNode): boolean {
  return !node.geometry && !isPassthrough(node)
}

export function emitSFC(ir: GLTFIR, options: EmitOptions): EmitResult {
  const {
    url,
    name = 'Model',
    slots: slotMode = 'named',
    shadows = false,
    keepGroups = false,
    keepNames = false,
    precision = 2,
    meta = false,
    command,
  } = options

  const warnings: string[] = []
  const slots: string[] = []
  const slotSpecs: SlotSpec[] = []

  const root = options.root ? findNode(ir.root, options.root) : ir.root
  if (!root) {
    throw new Error(`No node named "${options.root}" in this model.`)
  }

  const wantsInstancing = Boolean(options.instance || options.instanceAll)
  const plan: InstancePlan = wantsInstancing
    ? planInstancing(ir, root, Boolean(options.instanceAll))
    : NO_INSTANCING
  const instanced = plan.batches.length > 0

  if (wantsInstancing && !instanced) {
    warnings.push(
      `Nothing in this model can be batched: no two meshes share a geometry and material. Generated the plain component instead.`,
    )
  }

  const instancesModule = options.instancesModule ?? `./${name}.instances.gen.vue`

  /** Only nodes that draw something make a slot worth having. */
  const renderable = { candidates: 0, slotted: 0 }

  /** The key of the batch this node joins, which is the bucket's first node, not this one. */
  function batchOf(node: IRNode): string | undefined {
    return node.name ? plan.assignment.get(node.name) : undefined
  }

  function isSlotted(node: IRNode): boolean {
    // A bone must stay the parsed object for skinning to work, so overriding one is
    // meaningless — and a rig would otherwise emit dozens of dead slots.
    if (!node.name || slotMode === 'none' || node.type === 'Bone') {
      return false
    }
    return slotMode === 'all' || !EXPORTER_NAME.test(node.name)
  }

  /** `:position`, `:rotation`, `:scale` — the only attributes an `<Instance>` also takes. */
  function transformAttrs(node: IRNode): { attr: string, binding: SlotBinding }[] {
    const { position, rotation, scale } = node.transform ?? {}
    const out: { attr: string, binding: SlotBinding }[] = []

    if (position) {
      const expr = tuple(position, precision)
      out.push({ attr: `:position="${expr}"`, binding: { key: 'position', expr, type: '[number, number, number]' } })
    }
    if (rotation) {
      const expr = tuple(rotation, precision)
      out.push({ attr: `:rotation="${expr}"`, binding: { key: 'rotation', expr, type: '[number, number, number]' } })
    }
    if (scale) {
      const [x, y, z] = scale
      const uniform = x === y && y === z
      const expr = uniform ? String(round(x, precision)) : tuple(scale, precision)
      out.push({ attr: `:scale="${expr}"`, binding: { key: 'scale', expr, type: uniform ? 'number' : '[number, number, number]' } })
    }

    return out
  }

  function attributes(node: IRNode): string[] {
    const attrs: string[] = []

    if (keepNames && node.name) {
      attrs.push(`name="${node.name}"`)
    }
    if (shadows && node.geometry) {
      attrs.push('cast-shadow', 'receive-shadow')
    }
    if (node.geometry && node.name) {
      attrs.push(`:geometry="${access('nodes', node.name)}.geometry"`)
    }
    if (node.material) {
      attrs.push(`:material="${access('materials', node.material)}"`)
    }
    if (node.type === 'SkinnedMesh' && node.name) {
      attrs.push(`:skeleton="${access('nodes', node.name)}.skeleton"`)
    }
    if (node.morphTargets && node.name) {
      attrs.push(
        `:morph-target-dictionary="${access('nodes', node.name)}.morphTargetDictionary"`,
        `:morph-target-influences="${access('nodes', node.name)}.morphTargetInfluences"`,
      )
    }

    attrs.push(...transformAttrs(node).map(({ attr }) => attr))

    if (meta && node.userData) {
      attrs.push(`:user-data="${JSON.stringify(node.userData).replace(/"/g, '\'')}"`)
    }

    return attrs
  }

  /**
   * A batched mesh keeps nothing but its placement: geometry, material and shadow flags
   * belong to the `InstancedMesh` the provider owns, and `name` is the batch key, so
   * `--keepnames` cannot have it.
   */
  function instanceAttributes(node: IRNode, key: string): string[] {
    const attrs = [`name="${key}"`, ...transformAttrs(node).map(({ attr }) => attr)]
    if (meta && node.userData) {
      attrs.push(`:user-data="${JSON.stringify(node.userData).replace(/"/g, '\'')}"`)
    }
    return attrs
  }

  /**
   * A group that holds nothing but nesting can be dropped and its children hoisted.
   * Checked before slotting, so exporter wrappers never become override points.
   */
  function isPrunable(node: IRNode): boolean {
    return !keepGroups
      && isContainer(node)
      && !node.transform
      && !(meta && node.userData)
      && !(keepNames && node.name)
  }

  function renderChildren(children: IRNode[], depth: number): string[] {
    return children.flatMap(child => render(child, depth))
  }

  function render(node: IRNode, depth: number): string[] {
    const pad = INDENT.repeat(depth)

    if (isPassthrough(node)) {
      if (!node.name) {
        warnings.push(`Skipped an unnamed ${node.type}: there is no key to reference it by.`)
        return []
      }
      return wrap(node, [`${pad}<primitive :object="${access('nodes', node.name)}" />`], depth)
    }

    if (isPrunable(node)) {
      return renderChildren(node.children, depth)
    }

    const children = renderChildren(node.children, depth + 1)
    if (isContainer(node) && children.length === 0) {
      return []
    }

    const batch = batchOf(node)
    const tag = batch ? 'Instance' : node.tag
    const attrs = batch ? instanceAttributes(node, batch) : attributes(node)
    const open = [tag, ...attrs].join(' ')

    const lines = children.length === 0
      ? [`${pad}<${open} />`]
      : [`${pad}<${open}>`, ...children, `${pad}</${tag}>`]

    return wrap(node, lines, depth)
  }

  /**
   * What an override is handed. A batched node has no geometry or material of its own to
   * pass, so it gets the batch's instead, plus its placement — enough to opt out of the
   * batch and draw itself.
   *
   * `batch` is the other half: an override that wants to stay batched renders its own
   * `<Instance>`, and the key that batch registered under is `nodes[0]` of the bucket,
   * not this node's name, so it cannot be guessed from the slot name. Named `batch` and
   * not `name` because Vue reads a bound `name` on a `<slot>` as a dynamic slot name.
   */
  function slotBindings(node: IRNode): SlotBinding[] {
    const material = node.material
      ? {
          key: 'material',
          expr: access('materials', node.material),
          type: importable(ir.materials[node.material]?.type ?? '', 'Material'),
        }
      : undefined

    const batch = batchOf(node)
    if (batch && node.name) {
      return [
        { key: 'batch', expr: `'${batch.replace(/'/g, '\\\'')}'`, type: 'string' },
        { key: 'geometry', expr: `${access('nodes', node.name)}.geometry`, type: 'BufferGeometry' },
        ...(material ? [material] : []),
        ...transformAttrs(node).map(({ binding }) => binding),
      ]
    }

    return [
      { key: 'node', expr: access('nodes', node.name), type: importable(node.type, 'Object3D') },
      ...(material ? [material] : []),
    ]
  }

  /** Slots wrap an element with its generated markup as the fallback. */
  function wrap(node: IRNode, lines: string[], depth: number): string[] {
    const drawsSomething = Boolean(node.geometry) || isPassthrough(node)
    if (drawsSomething && node.name && node.type !== 'Bone') {
      renderable.candidates++
    }

    if (!isSlotted(node) || !node.name) {
      return lines
    }

    if (drawsSomething) {
      renderable.slotted++
    }

    const bindings = slotBindings(node)
    slots.push(node.name)
    slotSpecs.push({ name: node.name, bindings })

    const pad = INDENT.repeat(depth)
    const props = bindings.map(({ key, expr }) => `:${key}="${expr}"`)

    return [
      `${pad}<slot name="${node.name}" ${props.join(' ')}>`,
      ...lines.map(line => INDENT + line),
      `${pad}</slot>`,
    ]
  }

  const body = renderChildren(root.children, instanced ? 2 : 3)

  if (slotMode === 'named' && renderable.slotted === 0 && renderable.candidates > 0) {
    warnings.push(
      `Every mesh in this model is exporter-named, so --slots named produced no override points. Use --slots all to slot them anyway.`,
    )
  }

  // A `<primitive>` binds the one parsed object, and an Object3D has one parent. The whole
  // point of instancing is rendering the model more than once, so say what that costs.
  const shared = instanced ? collect(root, node => isPassthrough(node) && node.type !== 'Bone') : []
  if (shared.length > 0) {
    const [one] = shared
    warnings.push(
      `${shared.map(node => node.name).join(', ')} ${shared.length === 1 ? 'is' : 'are'} passed through as the parsed object, `
      + `so a second <${name}> steals ${shared.length === 1 ? 'it' : 'them'} from the first. `
      + `Generate from a subtree without ${shared.length === 1 ? one.name : 'them'} with --root, or place ${shared.length === 1 ? 'it' : 'them'} yourself.`,
    )
  }

  const hasAnimations = ir.animations.length > 0
  const loaderArgs = ir.draco ? `'${url}', { draco: true }` : `'${url}'`

  const { lines: localTypes, threeTypes: modelThreeTypes } = modelTypes(ir)

  const declareSlot = declarer(slotSpecs.map(slot => slot.name))
  const slotTypes = slotSpecs.length > 0
    ? [
        'defineSlots<{',
        ...slotSpecs.map(({ name: slotName, bindings }) => {
          const shape = bindings.map(({ key, type }) => `${key}: ${type}`).join(', ')
          return `${INDENT}${declareSlot(slotName)}?: (props: { ${shape} }) => any`
        }),
        '}>()',
        '',
      ]
    : []

  /**
   * Instancing moves `ModelNodes` / `ModelMaterials` into the provider, so the consumer
   * declares nothing and needs only the classes its slot props hand out. Importing the
   * full set would leave unused names in a file the consumer's `noUnusedLocals` reads.
   */
  const threeTypes = instanced
    ? new Set([
        ...slotSpecs.flatMap(slot => slot.bindings.map(binding => binding.type)),
        ...(hasAnimations ? ['AnimationClip'] : []),
      ].filter(type => THREE_CLASS.test(type)))
    : modelThreeTypes

  const cientos = [
    instanced ? 'Instance' : '',
    hasAnimations ? 'useAnimations' : '',
    instanced ? '' : 'useGLTF',
  ].filter(Boolean)

  const vue = [
    // Instancing hands the clips over already wrapped, so only the standalone build computes them.
    ...(hasAnimations && !instanced ? ['computed'] : []),
    ...(instanced ? ['inject'] : []),
    ...(hasAnimations ? ['ref'] : []),
  ]

  // The provider declares the model's shapes, so this file imports them instead of
  // repeating them. Types only: the injection key itself is a literal in both files.
  const provided = [...(hasAnimations ? ['ActionName'] : []), 'ModelContext']

  const imports = [
    threeTypes.size > 0 ? `import type { ${[...threeTypes].sort().join(', ')} } from 'three'` : '',
    instanced ? `import type { ${provided.join(', ')} } from '${instancesModule}'` : '',
    `import { ${cientos.join(', ')} } from '@tresjs/cientos'`,
    vue.length > 0 ? `import { ${vue.join(', ')} } from 'vue'` : '',
  ].filter(Boolean)

  const animationSetup = [
    `const modelRef = ref()`,
    `const { actions } = useAnimations<AnimationClip, ActionName>(animations, modelRef)`,
    '',
    `defineExpose({ nodes, materials, actions })`,
  ]

  const setup = instanced
    ? [
        `const context = inject<ModelContext>('${contextKey(name)}')`,
        'if (!context) {',
        `${INDENT}throw new Error('<${name}> renders instanced meshes, so it only works inside <${name}Instances>.')`,
        '}',
        '',
        `const { ${['nodes', 'materials', ...(hasAnimations ? ['animations'] : [])].join(', ')} } = context`,
        '',
        ...(hasAnimations ? animationSetup : [`defineExpose({ nodes, materials })`]),
      ]
    : hasAnimations
      ? [
          `const { state, nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>(${loaderArgs})`,
          '',
          `const animations = computed(() => state.value?.animations ?? [])`,
          ...animationSetup,
        ]
      : [
          `const { nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>(${loaderArgs})`,
          '',
          `defineExpose({ nodes, materials })`,
        ]

  /**
   * The root group stays mounted and gates its children instead of itself: a `ref`
   * on a `v-if`ed element is still undefined one flush after the clips land, and
   * `useAnimations` would then build its mixer with no root to bind against.
   */
  const rootAttrs = hasAnimations
    ? ['ref="modelRef"', ':dispose="null"']
    : [':dispose="null"']

  // The provider already gates on `isLoading`, and the consumer renders inside its slot.
  const template = instanced
    ? [
        `${INDENT}<TresGroup ${rootAttrs.join(' ')}>`,
        ...body,
        `${INDENT}</TresGroup>`,
      ]
    : [
        `${INDENT}<TresGroup ${rootAttrs.join(' ')}>`,
        `${INDENT.repeat(2)}<template v-if="!isLoading">`,
        ...body,
        `${INDENT.repeat(2)}</template>`,
        `${INDENT}</TresGroup>`,
      ]

  /**
   * The batched escape hatch is the one nobody guesses: it needs an import in the parent and
   * the batch key, so the header spells both out against a slot this model actually has.
   */
  const batched = slotSpecs.find(slot => slot.bindings.some(binding => binding.key === 'batch'))
  const batchedNote = batched
    ? [
        `A batched slot hands you \`batch\`, the key of the batch it joins (not always the slot name):`,
        `<template #${batched.name}="{ batch }"><Instance :name="batch" color="red" /></template>`,
        `with \`import { Instance } from '@tresjs/cientos'\` in the parent. Use the geometry and material`,
        `it also hands you instead to leave the batch and draw that part yourself.`,
      ]
    : []

  const code = [
    '<script setup lang="ts">',
    ...header(
      command,
      'Override the named slots from the parent instead; regenerating keeps your overrides.',
      instanced ? `Render inside <${name}Instances>, which owns the load and the batches.` : '',
      ...batchedNote,
    ),
    ...imports,
    '',
    ...(instanced ? [] : localTypes),
    ...slotTypes,
    ...setup,
    '</script>',
    '',
    '<template>',
    ...template,
    '</template>',
    '',
  ].join('\n')

  return {
    code,
    instances: instanced
      ? emitInstancesSFC(ir, { url, name, shadows, plan, command }).code
      : undefined,
    slots,
    warnings,
  }
}

function collect(node: IRNode, predicate: (node: IRNode) => boolean): IRNode[] {
  const found = predicate(node) && node.name ? [node] : []
  return [...found, ...node.children.flatMap(child => collect(child, predicate))]
}

function findNode(node: IRNode, name: string): IRNode | undefined {
  if (node.name === name) {
    return node
  }
  for (const child of node.children) {
    const match = findNode(child, name)
    if (match) {
      return match
    }
  }
  return undefined
}
