/**
 * The provider half of `--instance`. It owns the load and the `InstancedMesh` pool, and
 * hands both to the model component through `provide`, so N copies of the model share one
 * parse and one batch per geometry+material pair.
 *
 * One SFC is one component, so this has to be its own file. The model component is useless
 * without it and says so by throwing on a missing injection.
 */
import type { GLTFIR } from '../gltf/ir'
import type { InstancePlan } from './instancing'
import { access, declarer, header, INDENT, modelTypes } from './shared'

export interface EmitInstancesOptions {
  /** What the component passes to `useGLTF`. */
  url: string
  /** The model component's name, used for the injection key's description. */
  name?: string
  /** Set on the batches: an `InstancedMesh` casts for all its instances at once. */
  shadows?: boolean
  plan: InstancePlan
  /** Recorded in the header so regeneration is reproducible. */
  command?: string
}

/**
 * What the provider provides under and the model injects by. A literal in both files rather
 * than a shared `InjectionKey` symbol: exporting a const from an SFC means a second `<script>`
 * block, and every ordering of the two blocks trips one lint rule or another in the file the
 * consumer has to live with. The two files are always generated together, so the string
 * cannot drift.
 */
export function contextKey(name: string): string {
  return `tres-gltf:${name}`
}

export function emitInstancesSFC(ir: GLTFIR, options: EmitInstancesOptions): { code: string } {
  const { url, name = 'Model', shadows = false, plan, command } = options

  const hasAnimations = ir.animations.length > 0
  const loaderArgs = ir.draco ? `'${url}', { draco: true }` : `'${url}'`

  const { lines: types, threeTypes } = modelTypes(ir, true)

  const context = [
    '/** What the model component injects. Its own file declares none of this. */',
    'export interface ModelContext {',
    `${INDENT}nodes: ComputedRef<ModelNodes>`,
    `${INDENT}materials: ComputedRef<ModelMaterials>`,
    ...(hasAnimations ? [`${INDENT}animations: ComputedRef<AnimationClip[]>`] : []),
    '}',
  ]

  const declareBatch = declarer(plan.batches.map(batch => batch.key))
  const meshes = plan.batches.map(batch =>
    `${INDENT}${declareBatch(batch.key)}: ${access('nodes.value', batch.key)},`)

  const loaded = hasAnimations
    ? `const { state, nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>(${loaderArgs})`
    : `const { nodes, materials, isLoading } = useGLTF<ModelNodes, ModelMaterials>(${loaderArgs})`

  const provided = ['nodes', 'materials', ...(hasAnimations ? ['animations'] : [])]

  /**
   * `<script setup>` leads and the plain block trails, because the two lint as one program:
   * every import has to sit above every statement, and `<Merged>` only reaches the template
   * from `<script setup>`. Vue hoists both to module scope, so the types below are in scope
   * up here — which is also why the trailing block holds types and nothing else.
   */
  const code = [
    '<script setup lang="ts">',
    ...header(
      command,
      `Owns the load and the instanced batches. Render the model inside it:`,
      `<${name}Instances><${name} /><${name} :position="[3, 0, 0]" /></${name}Instances>`,
    ),
    threeTypes.size > 0 ? `import type { ${[...threeTypes].sort().join(', ')} } from 'three'` : '',
    `import type { ComputedRef } from 'vue'`,
    `import { Merged, useGLTF } from '@tresjs/cientos'`,
    `import { computed, provide } from 'vue'`,
    '',
    `// Initial buffer allocation per batch; the batch grows past it if more instances register.`,
    `withDefaults(defineProps<{ limit?: number }>(), { limit: 100 })`,
    '',
    loaded,
    '',
    '// One InstancedMesh per entry. Every <Instance name="..."> in the tree joins the batch',
    '// registered under that key, wherever in the hierarchy it sits.',
    'const meshes = computed(() => ({',
    ...meshes,
    '}))',
    '',
    ...(hasAnimations ? [`const animations = computed(() => state.value?.animations ?? [])`, ''] : []),
    `provide('${contextKey(name)}', { ${provided.join(', ')} })`,
    '',
    `defineExpose({ nodes, materials })`,
    '</script>',
    '',
    '<script lang="ts">',
    ...types,
    ...context,
    '</script>',
    '',
    '<template>',
    `${INDENT}<Merged v-if="!isLoading" :meshes="meshes" :limit="limit"${shadows ? ' cast-shadow receive-shadow' : ''}>`,
    `${INDENT.repeat(2)}<slot></slot>`,
    `${INDENT}</Merged>`,
    '</template>',
    '',
  ].join('\n')

  return { code }
}
