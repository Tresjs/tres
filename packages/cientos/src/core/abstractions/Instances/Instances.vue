<script setup lang="ts">
import type { BufferGeometry, Material } from 'three'
import { useLoop } from '@tresjs/core'
import { inject, onScopeDispose, provide, watch } from 'vue'
import { INSTANCES_INJECTION_KEY, MERGED_INJECTION_KEY } from './const'
import { useInstancesBatch } from './useInstancesBatch'

export interface InstancesProps {
  /**
   * Geometry shared by every instance. Owned by the consumer, never disposed here.
   */
  geometry: BufferGeometry
  /**
   * Material shared by every instance. Owned by the consumer, never disposed here.
   */
  material: Material | Material[]
  /**
   * Initial buffer allocation. Not a hard cap: the batch grows if more instances register.
   * @default 1000
   */
  limit?: number
  /**
   * Key this batch registers under with an ancestor `<Merged>`, so `<Instance batch="...">` can find it.
   */
  batch?: string
  /**
   * Name for the `InstancedMesh` itself, like on any other Tres element.
   */
  name?: string
  /**
   * Shadows belong to the batch, not to an `<Instance>`: one `InstancedMesh` draws them all.
   */
  castShadow?: boolean
  /**
   * @see castShadow
   */
  receiveShadow?: boolean
}

const props = withDefaults(defineProps<InstancesProps>(), { limit: 1000, castShadow: false, receiveShadow: false })

const { mesh, api, update } = useInstancesBatch(() => ({
  geometry: props.geometry,
  material: props.material,
  limit: props.limit,
}))

provide(INSTANCES_INJECTION_KEY, api)

const merged = inject(MERGED_INJECTION_KEY, null)

if (merged) {
  watch(() => props.batch, (batch, previous) => {
    if (previous) { delete merged[previous] }
    if (batch) { merged[batch] = api }
  }, { immediate: true })

  onScopeDispose(() => {
    if (props.batch && merged[props.batch] === api) { delete merged[props.batch] }
  })
}

// The batch is rebuilt whenever its geometry or material changes, so the name is reapplied
// rather than set once.
watch([mesh, () => props.name], ([current, name]) => {
  if (current) { current.name = name ?? '' }
}, { immediate: true })

useLoop().onBeforeRender(update)

defineExpose({ instance: mesh })
</script>

<template>
  <primitive
    v-if="mesh"
    :object="mesh"
    :cast-shadow="castShadow"
    :receive-shadow="receiveShadow"
  >
    <slot></slot>
  </primitive>
</template>
