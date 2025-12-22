<script setup lang="ts">
/* eslint-disable no-console */
import { OrbitControls } from '@tresjs/cientos'
import { useLoader } from '@tresjs/core'
import { LoadingManager } from 'three'
import type { GLTF } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const state = inject<{
  hasFinishLoading: boolean
  progress: number
}>('gltf-loader-state')!

const modelPaths = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/suzanne/suzanne.glb',
]

const manager = new LoadingManager()

manager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total) * 100
  state.progress = progress
}

// Create individual loaders for each model
const models = ref(modelPaths.map(path => useLoader<GLTF>(GLTFLoader, path, {
  manager,
})))

const computedIsLoading = computed(() => models.value.some(model => model.isLoading))

// Check if all models have loaded successfully and their scenes are available
const allModelsLoaded = computed(() => models.value.every(model =>
  !model.isLoading && model.state?.scene,
))

watch(allModelsLoaded, () => {
  console.log('allModelsLoaded', allModelsLoaded.value)
}, { immediate: true })

watch([computedIsLoading, allModelsLoaded], ([isLoading, loaded]) => {
  // Only set hasFinishLoading to true when all models are loaded AND their scenes are available
  setTimeout(() => {
    state.hasFinishLoading = !isLoading && loaded
  }, 1000)
}, { immediate: true })
</script>

<template>
  <TresPerspectiveCamera :position="[11, 11, 11]" />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <template v-for="(model, index) in models" :key="index">
    <primitive
      v-if="model.state?.scene"
      :object="model.state.scene"
      :position="[index * 3, 0, 0]"
    />
  </template>
</template>
