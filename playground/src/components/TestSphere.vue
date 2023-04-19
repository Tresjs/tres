<!-- eslint-disable max-len -->
<script setup lang="ts">
import { useRenderLoop, useTexture } from '/@/'
import { TresInstance } from '../types'

const sphereRef: Ref<TresInstance | null> = ref(null)

const { onLoop, resume } = useRenderLoop()
resume()
onLoop(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.position.y = Math.sin(elapsed * 0.2) * 2.0
  }
})

const pbrTexture = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_NormalGL.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
})
</script>
<template>
  <TresMesh ref="sphereRef" :position="[-2, 2, 2]" :scale="1" cast-shadow>
    <TresSphereGeometry :args="[1, 500, 500]" />
    <TresMeshStandardMaterial v-bind="pbrTexture" />
  </TresMesh>
</template>
