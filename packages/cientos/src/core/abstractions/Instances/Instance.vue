<script setup lang="ts">
import type { ColorRepresentation } from 'three'
import { computed, inject, onScopeDispose, shallowRef, watch } from 'vue'
import { INSTANCES_INJECTION_KEY, MERGED_INJECTION_KEY } from './const'
import { PositionMesh } from './PositionMesh'

export interface InstanceProps {
  /**
   * Batch to join, by the key it was given in `<Merged :meshes>`.
   * Omit to use the nearest `<Instances>`.
   */
  name?: string
  /**
   * Per-instance color, written into `instanceColor`.
   */
  color?: ColorRepresentation
}

const props = defineProps<InstanceProps>()

const node = shallowRef(new PositionMesh())

const merged = inject(MERGED_INJECTION_KEY, null)
const single = inject(INSTANCES_INJECTION_KEY, null)

// A named batch may not exist yet: `<Merged>` renders its `<Instances>` and its slot in the
// same tick, so children can set up first. The registry is reactive, so this rebinds when it lands.
const batch = computed(() => (props.name ? merged?.[props.name] ?? null : single))

watch(batch, (next, previous) => {
  previous?.unregister(node.value)
  node.value.batch = next
  next?.register(node.value)
  if (next && props.color !== undefined) { next.requestColorBuffer() }
}, { immediate: true })

watch(() => props.color, (color) => {
  if (color === undefined) { return }
  node.value.color.set(color)
  batch.value?.requestColorBuffer()
}, { immediate: true })

onScopeDispose(() => batch.value?.unregister(node.value))

defineExpose({ instance: node })
</script>

<template>
  <primitive :object="node">
    <slot></slot>
  </primitive>
</template>
