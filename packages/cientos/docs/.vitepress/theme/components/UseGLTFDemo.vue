<script setup lang="ts">
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/gltf/blender-cube.glb'
const { state } = useGLTF(path)
</script>

<template>
  <TresCanvas clear-color="#FBB03B">
    <TresPerspectiveCamera :position="[3, 2, 5]" />
    <OrbitControls />

    <primitive v-if="state" :object="state?.scene" />

    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
