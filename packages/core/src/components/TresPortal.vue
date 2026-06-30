<script setup lang="ts">
import type { Object3D } from 'three'

defineProps<{
  /** Target Object3D/Scene to reparent children into. */
  to: Object3D
  /** When true, children render in place (main scene) instead of the target. */
  disabled?: boolean
}>()
</script>

<template>
  <Teleport :to="to" :disabled="disabled">
    <slot></slot>
  </Teleport>
</template>
