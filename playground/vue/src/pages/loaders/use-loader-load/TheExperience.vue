<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useLoader } from '@tresjs/core'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const { data } = useLoader<GLTF>(GLTFLoader, 'models/scene.glb')
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <Suspense>
    <BlenderCube />
  </Suspense>
  <Suzanne />
</template>
