<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useLoop } from '@tresjs/core'

const sphereRef = ref()

const { onBeforeRender } = useLoop()

onBeforeRender((state) => {
  if (!sphereRef.value) { return }
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
  state.invalidate()
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
