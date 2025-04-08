<script setup lang="ts">
/* eslint-disable no-console */
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// Initialize DRACOLoader
const dracoLoader = new DRACOLoader()
// Set the path to the Draco decoder (you might want to use a CDN or local path)
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

const modelPath = ref('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb')
const { state: model, isLoading } = useLoader(
  GLTFLoader,
  modelPath,
  {
    extensions: (loader) => {
      if (loader instanceof GLTFLoader) {
        loader.setDRACOLoader(dracoLoader)
      }
    },
  },
)

setTimeout(() => {
  modelPath.value = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/cloud.gltf'
}, 2000)

watch(isLoading, (newIsLoading) => {
  console.log('isLoading', newIsLoading)
})

watch(model, (newModel) => {
  console.log('model', newModel)
})
/* eslint-enable no-console */
</script>

<template>
  <primitive v-if="model?.scene" :position="[0, 2, 0]" :object="model?.scene" />
</template>
