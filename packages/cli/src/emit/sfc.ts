import type { GLTFIR, IRNode, Vector3Tuple } from '../gltf/ir'
import * as THREE from 'three'

export interface EmitOptions {
  /** What the component passes to `useGLTF`. */
  url: string
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
  /** Recorded in the header so regeneration is reproducible. */
  command?: string
}

export interface EmitResult {
  code: string
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

const INDENT = '  '

function isVarName(key: string): boolean {
  return /^[$A-Z_][\w$]*$/i.test(key)
}

/** `nodes.Foo` when it is a legal identifier, `nodes['Foo bar']` when it is not. */
function access(base: string, key: string): string {
  return isVarName(key) ? `${base}.${key}` : `${base}['${key.replace(/'/g, '\\\'')}']`
}

/**
 * Declares keys the way `quote-props: consistent-as-needed` wants them: bare, unless one
 * key in the block has to be quoted, in which case they all are. A generated file the
 * consumer's linter wants to rewrite is a generated file that fights them on every run.
 */
function declarer(keys: string[]): (key: string) => string {
  const quoteAll = keys.some(key => !isVarName(key))
  return key => quoteAll ? `'${key.replace(/'/g, '\\\'')}'` : key
}

/**
 * `object.type` is whatever string three stamped on the instance, and not every one of
 * them is a class three exports — a name it does not export would make the generated
 * file fail to compile, so widen to the base class instead.
 */
function importable(type: string, base: 'Object3D' | 'Material'): string {
  return typeof (THREE as unknown as Record<string, unknown>)[type] === 'function' ? type : base
}

function round(value: number, precision: number): number {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function tuple(values: Vector3Tuple, precision: number): string {
  return `[${values.map(value => round(value, precision)).join(', ')}]`
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
  const { url, slots: slotMode = 'named', shadows = false, keepGroups = false, keepNames = false, precision = 2, meta = false, command } = options

  const warnings: string[] = []
  const slots: string[] = []
  const slotProps: { name: string, node: string, material?: string }[] = []

  const root = options.root ? findNode(ir.root, options.root) : ir.root
  if (!root) {
    throw new Error(`No node named "${options.root}" in this model.`)
  }

  /** Only nodes that draw something make a slot worth having. */
  const renderable = { candidates: 0, slotted: 0 }

  function isSlotted(node: IRNode): boolean {
    // A bone must stay the parsed object for skinning to work, so overriding one is
    // meaningless — and a rig would otherwise emit dozens of dead slots.
    if (!node.name || slotMode === 'none' || node.type === 'Bone') {
      return false
    }
    return slotMode === 'all' || !EXPORTER_NAME.test(node.name)
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

    const { position, rotation, scale } = node.transform ?? {}
    if (position) {
      attrs.push(`:position="${tuple(position, precision)}"`)
    }
    if (rotation) {
      attrs.push(`:rotation="${tuple(rotation, precision)}"`)
    }
    if (scale) {
      const [x, y, z] = scale
      attrs.push(x === y && y === z ? `:scale="${round(x, precision)}"` : `:scale="${tuple(scale, precision)}"`)
    }

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

    const attrs = attributes(node)
    const open = [node.tag, ...attrs].join(' ')

    const lines = children.length === 0
      ? [`${pad}<${open} />`]
      : [`${pad}<${open}>`, ...children, `${pad}</${node.tag}>`]

    return wrap(node, lines, depth)
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
    slots.push(node.name)
    slotProps.push({
      name: node.name,
      node: importable(node.type, 'Object3D'),
      material: node.material ? importable(ir.materials[node.material]?.type ?? '', 'Material') : undefined,
    })
    const pad = INDENT.repeat(depth)
    const props = [`:node="${access('nodes', node.name)}"`]
    if (node.material) {
      props.push(`:material="${access('materials', node.material)}"`)
    }

    return [
      `${pad}<slot name="${node.name}" ${props.join(' ')}>`,
      ...lines.map(line => INDENT + line),
      `${pad}</slot>`,
    ]
  }

  const body = renderChildren(root.children, 3)

  if (slotMode === 'named' && renderable.slotted === 0 && renderable.candidates > 0) {
    warnings.push(
      `Every mesh in this model is exporter-named, so --slots named produced no override points. Use --slots all to slot them anyway.`,
    )
  }

  const hasAnimations = ir.animations.length > 0
  const loaderArgs = ir.draco ? `'${url}', { draco: true }` : `'${url}'`

  /**
   * The keys `useGLTF` hands back at runtime, declared up front. They come straight
   * from the parsed model, so the file describes this export and no other: a re-export
   * that drops a mesh turns into a type error at the override that used it.
   */
  const declareNode = declarer(Object.keys(ir.nodes))
  const declareMaterial = declarer(Object.keys(ir.materials))

  const nodeShape = Object.entries(ir.nodes)
    .map(([name, entry]) => `${INDENT}${declareNode(name)}: ${importable(entry.type, 'Object3D')}`)
  const materialShape = Object.entries(ir.materials)
    .map(([name, entry]) => `${INDENT}${declareMaterial(name)}: ${importable(entry.type, 'Material')}`)

  const threeTypes = new Set<string>([
    ...Object.values(ir.nodes).map(entry => importable(entry.type, 'Object3D')),
    ...Object.values(ir.materials).map(entry => importable(entry.type, 'Material')),
  ])
  if (hasAnimations) {
    threeTypes.add('AnimationClip')
  }

  const types = [
    'interface ModelNodes {',
    ...nodeShape,
    '}',
    '',
    'interface ModelMaterials {',
    ...materialShape,
    '}',
    // `=` leads its line and the members line up under it: `style/operator-linebreak`,
    // the same shape core writes its own unions in.
    ...(hasAnimations
      ? [
          '',
          'type ActionName',
          ...ir.animations.map((clip, index) =>
            `${index === 0 ? `${INDENT}= ` : INDENT.repeat(2)}| '${clip.replace(/'/g, '\\\'')}'`),
        ]
      : []),
    '',
  ]

  const declareSlot = declarer(slotProps.map(slot => slot.name))

  const slotTypes = slotProps.length > 0
    ? [
        'defineSlots<{',
        ...slotProps.map(({ name, node, material }) => {
          const props = material ? `{ node: ${node}, material: ${material} }` : `{ node: ${node} }`
          return `${INDENT}${declareSlot(name)}?: (props: ${props}) => any`
        }),
        '}>()',
        '',
      ]
    : []

  const imports = [
    threeTypes.size > 0 ? `import type { ${[...threeTypes].sort().join(', ')} } from 'three'` : '',
    hasAnimations
      ? `import { useAnimations, useGLTF } from '@tresjs/cientos'`
      : `import { useGLTF } from '@tresjs/cientos'`,
    hasAnimations ? `import { computed, ref } from 'vue'` : '',
  ].filter(Boolean)

  const loader = `useGLTF<ModelNodes, ModelMaterials>(${loaderArgs})`

  const setup = hasAnimations
    ? [
        `const { state, nodes, materials, isLoading } = ${loader}`,
        '',
        `const modelRef = ref()`,
        `const animations = computed(() => state.value?.animations ?? [])`,
        `const { actions } = useAnimations<AnimationClip, ActionName>(animations, modelRef)`,
        '',
        `defineExpose({ nodes, materials, actions })`,
      ]
    : [
        `const { nodes, materials, isLoading } = ${loader}`,
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

  const header = [
    '/*',
    'Auto-generated by @tresjs/cli. Do not edit.',
    command ? `Command: ${command}` : '',
    'Override the named slots from the parent instead; regenerating keeps your overrides.',
    '*/',
  ].filter(Boolean)

  const code = [
    '<script setup lang="ts">',
    ...header,
    ...imports,
    '',
    ...types,
    ...slotTypes,
    ...setup,
    '</script>',
    '',
    '<template>',
    `${INDENT}<TresGroup ${rootAttrs.join(' ')}>`,
    `${INDENT.repeat(2)}<template v-if="!isLoading">`,
    ...body,
    `${INDENT.repeat(2)}</template>`,
    `${INDENT}</TresGroup>`,
    '</template>',
    '',
  ].join('\n')

  return { code, slots, warnings }
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
