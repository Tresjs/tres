<script setup lang="ts">
/* eslint-disable no-console */
import { OrbitControls } from '@tresjs/cientos'
import { useLoader } from '@tresjs/core'
import { LoadingManager, Texture, TextureLoader } from 'three'

const state = inject<{
  hasFinishLoading: boolean
  progress: number
}>('gltf-loader-state')!

const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total) * 100
  state.progress = progress
}

const { state: texture, isLoading } = useLoader(
  TextureLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  {
    manager,
    initialValue: new Texture(),
  },
)

watch(isLoading, (newIsLoading) => {
  console.log('isLoading', newIsLoading)
  if (newIsLoading) {
    state.hasFinishLoading = false
  }
})

watch(texture, (newTexture) => {
  console.log('texture', newTexture)
  setTimeout(() => {
    state.hasFinishLoading = true
  }, 1000)
})
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <TresMesh>
    <TresBoxGeometry />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>
</template>
