<script setup lang="ts">
import { type TresGLTF, useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { LoaderProto } from 'three/examples/jsm/loaders/LoaderProto.js'

// Initialize DRACOLoader
const dracoLoader = new DRACOLoader()
// Set the path to the Draco decoder (you might want to use a CDN or local path)
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

const { data } = await useLoader<TresGLTF>(
  GLTFLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  (loader) => {
    loader.setDRACOLoader?.(dracoLoader)
  },
)
</script>

<template>
  <primitive v-if="data?.nodes?.Cube" :position="[0, 2, 0]" :object="data?.nodes?.Cube" />
</template>
