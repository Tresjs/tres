<script setup lang="ts">
/* eslint-disable no-console */
import { OrbitControls, useTexture } from '@tresjs/cientos'

const state = inject<{
  hasFinishLoading: boolean
  progress: number
}>('gltf-loader-state')!

const { state: texture, isLoading } = useTexture(
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
)

watch(isLoading, (newIsLoading) => {
  console.log('isLoading', newIsLoading)
  if (newIsLoading) {
    state.hasFinishLoading = false
  }
}, { immediate: true })

watch(texture, (newTexture) => {
  console.log('texture', newTexture)
  setTimeout(() => {
    state.hasFinishLoading = true
  }, 1000)
}, { immediate: true })
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <TresMesh>
    <TresSphereGeometry />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>
</template>
