<script setup lang="ts">
/* eslint-disable no-console */
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { LoaderProto } from '@tresjs/core'

// Initialize DRACOLoader
const dracoLoader = new DRACOLoader()
// Set the path to the Draco decoder (you might want to use a CDN or local path)
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

// Cast GLTFLoader to our TresLoader type since we know it's compatible
const TresGLTFLoader = GLTFLoader as unknown as LoaderProto<GLTF>

const { data, isLoading } = useLoader<GLTF>(
  TresGLTFLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/suzanne/suzanne.glb',
  (loader) => {
    // Cast back to GLTFLoader to use its specific methods
    (loader as unknown as GLTFLoader).setDRACOLoader(dracoLoader)
  },
)

watch(isLoading, (newIsLoading) => {
  console.log('isLoading', newIsLoading)
}, {
  immediate: true,
})

watch(data, (newData) => {
  console.log('data', newData)
})
/* eslint-enable no-console */
</script>

<template>
  <primitive v-if="data?.nodes?.Suzanne" :position="[2, 2, 0]" :object="data?.nodes?.Suzanne" />
</template>
