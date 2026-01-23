<script setup>
import { shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'

const meshRef = shallowRef()

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (meshRef.value) {
    meshRef.value.rotation.y = elapsed * 0.5
    meshRef.value.rotation.x = elapsed * 0.2
  }
})
</script>

<template>
  <TresMesh ref="meshRef">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="orange" transparent />
  </TresMesh>
</template>
