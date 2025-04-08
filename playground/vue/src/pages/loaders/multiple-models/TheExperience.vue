<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const modelPaths = ref([
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/suzanne/suzanne.glb',
])
// When passing an array of paths, useLoader returns an array of UseAsyncStateReturn objects
const modelResults = useLoader(GLTFLoader, modelPaths)

setTimeout(() => {
  // modelPaths.value = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
}, 2000)
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <template v-if="modelResults.length > 0">
    <template v-for="(model, index) in modelResults" :key="index">
      <primitive v-if="model.state.value" :object="model.state.value.scene" :position="[index * 3, 0, 0]" />
    </template>
  </template>
</template>
