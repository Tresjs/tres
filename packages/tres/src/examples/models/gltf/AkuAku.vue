<script setup lang="ts">
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '/@/core'
const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
</script>
<template>
  <TresMesh v-bind="scene" />
</template>
