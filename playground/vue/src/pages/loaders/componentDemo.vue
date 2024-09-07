<script setup>
import { TresCanvas, UseLoader } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const url = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb'
</script>

<template>
  <TresCanvas window-size clear-color="#333">
    <TresPerspectiveCamera :position="[0, 3, 7]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Suspense>
      <UseLoader v-slot="{ data }" :loader="GLTFLoader" :url="url">
        <primitive :object="data.scene" />
      </useloader>
    </Suspense>
    <TresDirectionalLight :position="[0, 10, 0]" :intensity="1" />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
