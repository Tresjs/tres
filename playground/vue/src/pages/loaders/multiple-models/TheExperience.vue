<script setup lang="ts">
/* eslint-disable no-console */
import { OrbitControls } from '@tresjs/cientos'
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const { data } = useLoader(GLTFLoader, [
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/suzanne/suzanne.glb',
])

watch(data, (newData) => {
  console.log(newData)
})
/* eslint-enable no-console */
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <primitive v-for="(model, index) in data" :key="index" :object="model.scene" :position="[index * 3, 0, 0]" />
</template>
