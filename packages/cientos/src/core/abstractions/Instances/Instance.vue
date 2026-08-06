<script setup lang="ts">
import type { ColorRepresentation } from 'three'
import { logWarning } from '@tresjs/core'
import { computed, inject, nextTick, onMounted, onScopeDispose, shallowRef, watch } from 'vue'
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

/**
 * A `PositionMesh` with no batch renders nothing and reports nothing, and the key a batch
 * registers under is not always the name of the mesh it came from, so a plausible-looking
 * `name` fails silently. Checked a tick after mount, by which point a sibling `<Instances>`
 * has registered.
 */
onMounted(() => nextTick(() => {
  if (batch.value) { return }

  if (!merged && !single) {
    logWarning('Instance: no batch to join, so this renders nothing. An <Instance> belongs inside <Instances> or <Merged>.')
    return
  }
  if (!merged) {
    logWarning(`Instance: \`name\` picks a batch out of a <Merged>, and there is none above this one, so "${props.name}" renders nothing. Drop \`name\` to join the enclosing <Instances>.`)
    return
  }
  if (!props.name) {
    logWarning('Instance: <Merged> keys its batches, so an instance inside one needs a `name` to pick one. This renders nothing.')
    return
  }
  // An empty registry can just as well mean an ancestor is still loading its meshes. One
  // holding batches but not this key cannot: that name is wrong.
  const available = Object.keys(merged)
  if (available.length > 0) {
    logWarning(`Instance: no batch named "${props.name}", so this renders nothing. Available: ${available.join(', ')}.`)
  }
}))

defineExpose({ instance: node })
</script>

<template>
  <primitive :object="node">
    <slot></slot>
  </primitive>
</template>
