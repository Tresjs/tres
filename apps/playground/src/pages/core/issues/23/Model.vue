<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { state } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
</script>

<template>
  <primitive v-if="state?.scene" :object="state.scene" />
</template>
