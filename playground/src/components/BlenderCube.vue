<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes } 
  = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
const model = nodes.Cube
</script>

<template>
  <primitive :object="model" />
</template>