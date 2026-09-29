import type { GLTFIR, IRNode } from '../gltf/ir'
import type { IRPhysics } from '../gltf/physics'
import type { InstancePlan } from './instancing'
import { contextKey, emitInstancesSFC } from './instances'
import { NO_INSTANCING, planInstancing } from './instancing'
import { bodyAttributes, colliderOf, colliderProxy, physicsWarnings, RAPIER_IMPORT } from './physics'
import { access, clipLoads, clipSources, declarer, header, importable, INDENT, mergedClips, modelTypes, round, tuple } from './shared'

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
  /** Generate physics bodies from the collider suffixes on node names. */
  physics?: 'rapier'
  /** Import specifier for the emitted provider, when instancing. */
  instancesModule?: string
  /** Url per `--animations` file, index-matched to `ir.animationSources`. */
  animationURLs?: string[]
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

/** The `ready` payload and `emit` call, by whether the model carries clips. */
const READY_PAYLOAD = {
  animated: {
    type: '{ nodes: ModelNodes, materials: ModelMaterials, actions: Record<ActionName, AnimationAction | undefined> }',
    value: '{ nodes: nodes.value, materials: materials.value, actions }',
  },
  static: {
    type: '{ nodes: ModelNodes, materials: ModelMaterials }',
    value: '{ nodes: nodes.value, materials: materials.value }',
  },
} as const

/**
 * The `ready` declaration. Separate from the wiring below because it has to sit above
 * `defineSlots`, which `vue/define-macros-order` enforces in the consumer's own lint run.
 */
function readyEmits(payload: { type: string, value: string }): string[] {
  return [
    'const emit = defineEmits<{',
    `${INDENT}ready: [${payload.type}]`,
    '}>()',
    '',
  ]
}

/**
 * The `ready`/`isReady` pair. The event is one-shot per load, so a parent that binds late has
 * nothing to read — `isReady` is the replayable half. Post-flush so it fires after the tree is
 * in the graph, and back to `false` the moment any term stops holding, so it never lies after a
 * refetch (`useGLTF` exposes `execute()`).
 *
 * `terms` are AND-ed into one boolean, which is what the watch reads: the callback then only
 * runs when readiness actually flips, and each term names what it waits for instead of sitting
 * at a position in an array the guard has to index.
 */
function readySetup(payload: { type: string, value: string }, terms: string[]): string[] {
  // `&&` leads its line: `style/operator-linebreak`, the shape the consumer's linter wants.
  const source = terms.length === 1
    ? [`${INDENT}() => ${terms[0]},`]
    : [
        `${INDENT}() => ${terms[0]}`,
        ...terms.slice(1).map((term, index) =>
          `${INDENT.repeat(2)}&& ${term}${index === terms.length - 2 ? ',' : ''}`),
      ]

  return [
    'const isReady = ref(false)',
    'watch(',
    ...source,
    `${INDENT}(ready) => {`,
    `${INDENT.repeat(2)}if (!ready) {`,
    `${INDENT.repeat(3)}isReady.value = false`,
    `${INDENT.repeat(3)}return`,
    `${INDENT.repeat(2)}}`,
    `${INDENT.repeat(2)}if (isReady.value) { return }`,
    `${INDENT.repeat(2)}isReady.value = true`,
    `${INDENT.repeat(2)}emit('ready', ${payload.value})`,
    `${INDENT}},`,
    `${INDENT}{ flush: 'post', immediate: true },`,
    ')',
  ]
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

  const wantsPhysics = options.physics === 'rapier'
  /** How many `<RigidBody>` elements the render actually produced. */
  let bodies = 0

  function physicsOf(node: IRNode): IRPhysics | undefined {
    return wantsPhysics ? colliderOf(node) : undefined
  }

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

  const animated = new Set(ir.animated)

  /**
   * A node a clip drives keeps its name whatever `--keepnames` says, and survives pruning:
   * the mixer resolves tracks by name against the rendered tree, so dropping one leaves the
   * clip binding to nothing.
   */
  function isAnimated(node: IRNode): boolean {
    return Boolean(node.name) && animated.has(node.name)
  }

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

  /**
   * A body owns its placement, so `:position` and `:rotation` move up to the `<RigidBody>`.
   * `:scale` stays on the mesh: rapier reads it off the child to size the collider it derives.
   */
  function ownTransformAttrs(node: IRNode, physics?: IRPhysics): string[] {
    return transformAttrs(node)
      .filter(({ binding }) => !physics || binding.key === 'scale')
      .map(({ attr }) => attr)
  }

  function attributes(node: IRNode, physics?: IRPhysics): string[] {
    const attrs: string[] = []

    if ((keepNames || isAnimated(node)) && node.name) {
      attrs.push(`name="${node.name}"`)
    }
    // An invisible proxy is never drawn, so shadow flags on one are noise.
    if (shadows && node.geometry && !physics?.hidden) {
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

    // `_colonly` collides without drawing: the mesh is a proxy for a visual sibling.
    if (physics?.hidden) {
      attrs.push(':visible="false"')
    }

    attrs.push(...ownTransformAttrs(node, physics))

    if (meta && node.userData) {
      attrs.push(`:user-data="${JSON.stringify(node.userData).replace(/"/g, '\'')}"`)
    }

    return attrs
  }

  /**
   * A batched mesh keeps nothing but its placement: geometry, material and shadow flags
   * belong to the `InstancedMesh` the provider owns. `batch` is the key it joins under,
   * which is the bucket's first mesh and so the same for every copy in it — `name` is
   * still this node's own, and what a clip binds against.
   */
  function instanceAttributes(node: IRNode, key: string, physics?: IRPhysics): string[] {
    const attrs = [`batch="${key}"`]
    if ((keepNames || isAnimated(node)) && node.name) {
      attrs.push(`name="${node.name}"`)
    }
    attrs.push(...ownTransformAttrs(node, physics))
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
      && !physicsOf(node)
      && !node.transform
      && !(meta && node.userData)
      && !(keepNames && node.name)
      && !isAnimated(node)
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

    const physics = physicsOf(node)
    const children = renderChildren(node.children, depth + (physics ? 2 : 1))
    if (isContainer(node) && children.length === 0 && !physics) {
      return []
    }

    const batch = batchOf(node)
    const tag = batch ? 'Instance' : node.tag
    const attrs = batch ? instanceAttributes(node, batch, physics) : attributes(node, physics)
    const open = [tag, ...attrs].join(' ')

    const element = children.length === 0
      ? [`${pad}<${open} />`]
      : [`${pad}<${open}>`, ...children, `${pad}</${tag}>`]

    return wrap(node, physics ? renderBody(node, physics, element, depth) : element, depth)
  }

  /**
   * The mesh goes inside the body it declares, because that is where `RigidBody` looks for a
   * geometry to derive its colliders from — it reads its own direct children.
   */
  function renderBody(node: IRNode, physics: IRPhysics, element: string[], depth: number): string[] {
    bodies++

    const pad = INDENT.repeat(depth)
    const own = transformAttrs(node)
    const attrs = [
      ...bodyAttributes(physics),
      ...own.filter(({ binding }) => binding.key !== 'scale').map(({ attr }) => attr),
    ]

    // A batched node renders as a geometry-less `<Instance>`, so the body needs the geometry
    // handed back to it separately or it has nothing to collide with — scaled the way the
    // `<Instance>` is, since that is what rapier measures the collider against.
    const scale = own.find(({ binding }) => binding.key === 'scale')?.attr
    const inner = batchOf(node) ? [...element, `${pad}${colliderProxy(node, scale)}`] : element

    return [
      `${pad}<RigidBody ${attrs.join(' ')}>`,
      ...inner.map(line => INDENT + line),
      `${pad}</RigidBody>`,
    ]
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

  if (wantsPhysics) {
    warnings.push(...physicsWarnings(root))
  }

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

  const hasAnimations = ir.clips.length > 0
  /** Only a model with clips of its own needs `state`, and an unused one trips noUnusedLocals. */
  const hasOwnClips = ir.animations.length > 0
  const sources = clipSources(ir.animationSources, options.animationURLs)
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
        ...(hasAnimations ? ['AnimationClip', 'AnimationAction'] : []),
      ].filter(type => THREE_CLASS.test(type)))
    : modelThreeTypes

  // The `ready` payload types `actions` as `AnimationAction`, which `modelTypes` leaves out.
  if (hasAnimations && !instanced) {
    threeTypes.add('AnimationAction')
  }

  const cientos = [
    instanced ? 'Instance' : '',
    hasAnimations ? 'useAnimations' : '',
    instanced ? '' : 'useGLTF',
  ].filter(Boolean)

  const vue = [
    // Instancing hands the clips over already wrapped, so only the standalone build computes them.
    ...(hasAnimations && !instanced ? ['computed'] : []),
    ...(instanced ? ['inject'] : []),
    // `ready`/`isReady` need both on every variant.
    'ref',
    'watch',
  ]

  // The provider declares the model's shapes, so this file imports them instead of
  // repeating them. Types only: the injection key itself is a literal in both files.
  // `ModelNodes` / `ModelMaterials` are named in the `ready` payload type. Sorted, because
  // `perfectionist/sort-named-imports` reads the generated file as readily as a written one.
  const provided = [
    ...(hasAnimations ? ['ActionName'] : []),
    'ModelContext',
    'ModelMaterials',
    'ModelNodes',
  ]

  const imports = [
    threeTypes.size > 0 ? `import type { ${[...threeTypes].sort().join(', ')} } from 'three'` : '',
    instanced ? `import type { ${provided.join(', ')} } from '${instancesModule}'` : '',
    `import { ${cientos.join(', ')} } from '@tresjs/cientos'`,
    bodies > 0 ? RAPIER_IMPORT : '',
    vue.length > 0 ? `import { ${vue.join(', ')} } from 'vue'` : '',
  ].filter(Boolean)

  const animationBind = [
    `const modelRef = ref()`,
    `const { actions } = useAnimations<AnimationClip, ActionName>(animations, modelRef)`,
    '',
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
        // No `isLoading` or `state` here — the provider owns the load — so ready follows the
        // injected data: the actions binding when animated, the nodes populating when not.
        ...(hasAnimations
          ? [
              ...animationBind,
              ...readySetup(READY_PAYLOAD.animated, ['Object.keys(actions).length > 0']),
              '',
              `defineExpose({ nodes, materials, actions, isReady })`,
            ]
          : [
              ...readySetup(READY_PAYLOAD.static, ['Object.keys(nodes.value).length > 0']),
              '',
              `defineExpose({ nodes, materials, isReady })`,
            ]),
      ]
    : hasAnimations
      ? [
          `const { state, nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>(${loaderArgs})`,
          ...clipLoads(sources, { loading: true }),
          '',
          ...mergedClips(hasOwnClips, sources),
          ...animationBind,
          // Every source has to land AND the actions bind: each clip file resolves on its own, so
          // a handler firing on the first population would see the later clips undefined. `state`
          // is the one that tells a finished load from a failed one — the actions bind against the
          // root group, which stays mounted whatever the model did, so clips from a `--animations`
          // file fill `actions` even when the model itself never arrived.
          ...readySetup(READY_PAYLOAD.animated, [
            '!isLoading.value',
            ...sources.map(source => `!${source.loading}.value`),
            'state.value !== null',
            'Object.keys(actions).length > 0',
          ]),
          '',
          `defineExpose({ nodes, materials, actions, isReady })`,
        ]
      : [
          `const { state, nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>(${loaderArgs})`,
          '',
          // `isLoading` is cleared in a `finally`, so a 404 clears it exactly like a success.
          // `state` is set only when the load produced a scene, and nulled again on every
          // refetch, so it is what keeps a failed load out of a `ready` handler.
          ...readySetup(READY_PAYLOAD.static, ['!isLoading.value', 'state.value !== null']),
          '',
          `defineExpose({ nodes, materials, isReady })`,
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
  /**
   * One world holds every model, so the component never renders its own `<Physics>` — and a
   * body outside one silently never simulates, which is worth a line in the file itself.
   */
  const physicsNote = bodies > 0
    ? [
        `Colliders come from the suffixes on the node names. Render this inside <Physics> from`,
        `'@tresjs/rapier', or the bodies never simulate.`,
      ]
    : []

  const batched = slotSpecs.find(slot => slot.bindings.some(binding => binding.key === 'batch'))
  const batchedNote = batched
    ? [
        `A batched slot hands you \`batch\`, the key of the batch it joins (not always the slot name):`,
        `<template #${batched.name}="{ batch }"><Instance :batch color="red" /></template>`,
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
      ...physicsNote,
      ...batchedNote,
    ),
    ...imports,
    '',
    ...(instanced ? [] : localTypes),
    // Above `defineSlots`: `vue/define-macros-order` wants the macros in that order, and the
    // payload type is declared (or imported) further up either way.
    ...readyEmits(hasAnimations ? READY_PAYLOAD.animated : READY_PAYLOAD.static),
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
      ? emitInstancesSFC(ir, { url, name, shadows, plan, command, animationURLs: options.animationURLs }).code
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
