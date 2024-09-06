<script setup lang="ts">
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/gltf/blender-cube.glb'
const { scene } = await useGLTF(path)
</script>

<template>
  <TresCanvas clear-color="#F78B3D">
    <TresPerspectiveCamera :position="[3, 2, 5]" />
    <OrbitControls />
    <Suspense>
      <primitive :object="scene" />
    </Suspense>
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
