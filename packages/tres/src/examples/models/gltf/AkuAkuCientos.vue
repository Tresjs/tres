<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
const { scene } = await useGLTF('/models/AkuAku.gltf')
</script>
<template>
  <TresMesh v-bind="scene" />
</template>
