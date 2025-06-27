<script setup lang="ts">
/* eslint-disable no-console */
import { LoadingManager } from 'three'

import { useLoader } from '@tresjs/core'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const state = inject<{
  hasFinishLoading: boolean
  progress: number
}>('gltf-loader-state')!

const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total) * 100
  state.progress = progress
}

const { state: model, isLoading } = useLoader(
  FBXLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx',
  {
    manager,
  },
)

watch(isLoading, (newIsLoading) => {
  console.log('isLoading', newIsLoading)
  if (newIsLoading) {
    state.hasFinishLoading = false
  }
})

watch(model, (newModel) => {
  console.log('model', newModel)
  setTimeout(() => {
    state.hasFinishLoading = true
  }, 1000)
})
/* eslint-enable no-console */
</script>

<template>
  <primitive v-if="model" :object="model" :scale="0.01" />
</template>
