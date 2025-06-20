<script setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, UseLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const url = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb'
</script>

<template>
  <TresCanvas window-size clear-color="#333">
    <TresPerspectiveCamera :position="[0, 3, 7]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <UseLoader v-slot="{ state }" :loader="GLTFLoader" :path="url">
      <primitive v-if="state?.scene" :object="state.scene" />
    </UseLoader>
    <TresDirectionalLight :position="[0, 10, 0]" :intensity="1" />
    <TresAmbientLight :intensity="0.5" />
    <TresGridHelper />
  </TresCanvas>
</template>
