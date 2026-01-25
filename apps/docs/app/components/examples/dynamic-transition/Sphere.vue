<script setup>
import { shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'

const sphereRef = shallowRef()

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.position.y = Math.sin(elapsed) * 0.5
    sphereRef.value.position.x = Math.cos(elapsed) * 0.2
  }
})
</script>

<template>
  <TresMesh ref="sphereRef">
    <TresSphereGeometry :args="[1, 32]" />
    <TresMeshStandardMaterial color="orange" transparent />
  </TresMesh>
</template>
