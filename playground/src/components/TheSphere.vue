<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useUpdate } from '@tresjs/core'

const sphereRef = ref()
useUpdate((state) => {
  if (!sphereRef.value) { return }
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
})
</script>

<template>
  <TresMesh
    ref="sphereRef"
    :position="[2, 2, 0]"
    name="sphere"
    cast-shadow
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
</template>
