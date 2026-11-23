<script setup lang="ts">
import { useNodes, useUniforms } from '@tresjs/core/webgpu'

defineProps<{ x: number }>()

// Every mesh reads the same node and uniform objects from the canvas store.
const { wave } = useNodes()
const { uColor } = useUniforms('wave')
</script>

<template>
  <TresMesh :position-x="x">
    <TresIcosahedronGeometry :args="[0.8, 32]" />
    <TresMeshStandardNodeMaterial :position-node="wave" :color-node="uColor" :roughness="0.4" />
  </TresMesh>
</template>
