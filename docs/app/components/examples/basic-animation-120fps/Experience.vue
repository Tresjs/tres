<script setup lang="ts">
import { ref } from 'vue'
import { useLoop } from '@tresjs/core'
import type { Mesh } from 'three'

const cubeRef = ref<Mesh | null>(null)

const { onBeforeRender } = useLoop()

let lastTime = 0
const targetFPS = 120
const frameInterval = 1000 / targetFPS

onBeforeRender(({ elapsed }) => {
  const currentTime = elapsed * 1000

  if (currentTime - lastTime >= frameInterval) {
    if (cubeRef.value) {
      // Fixed rotation per frame (not time-based) - 120 FPS (faster)
      cubeRef.value.rotation.x += 0.02
      cubeRef.value.rotation.y += 0.02
    }
    lastTime = currentTime
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 1, 5]" />
  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" />
  <TresMesh ref="cubeRef" :position="[0, 1, 0]">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="#4ecdc4" />
  </TresMesh>
  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" />
</template>
