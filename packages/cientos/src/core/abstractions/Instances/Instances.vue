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
   * Key this batch registers under with an ancestor `<Merged>`, so `<Instance name="...">` can find it.
   */
  name?: string
}

const props = withDefaults(defineProps<InstancesProps>(), { limit: 1000 })

const { mesh, api, update } = useInstancesBatch(() => ({
  geometry: props.geometry,
  material: props.material,
  limit: props.limit,
}))

provide(INSTANCES_INJECTION_KEY, api)

const merged = inject(MERGED_INJECTION_KEY, null)

if (merged) {
  watch(() => props.name, (name, previous) => {
    if (previous) { delete merged[previous] }
    if (name) { merged[name] = api }
  }, { immediate: true })

  onScopeDispose(() => {
    if (props.name && merged[props.name] === api) { delete merged[props.name] }
  })
}

useLoop().onBeforeRender(update)

defineExpose({ instance: mesh })
</script>

<template>
  <primitive
    v-if="mesh"
    :object="mesh"
  >
    <slot></slot>
  </primitive>
</template>
