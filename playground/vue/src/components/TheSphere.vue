<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useLoop } from '@tresjs/core'

const sphereRef = ref()

const { onBeforeRender } = useLoop()

onBeforeRender(({ invalidate, elapsed }) => {
  if (!sphereRef.value) { return }
  sphereRef.value.position.y += Math.sin(elapsed) * 0.01
  invalidate()
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
