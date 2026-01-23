<script setup>
import { shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'

const meshRef = shallowRef()

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (meshRef.value) {
    meshRef.value.position.y = Math.sin(elapsed) * 0.5
    meshRef.value.position.x = Math.cos(elapsed) * 0.2
  }
})
</script>

<template>
  <TresMesh ref="meshRef">
    <TresSphereGeometry :args="[1, 32]" />
    <TresMeshStandardMaterial color="orange" transparent />
  </TresMesh>
</template>
