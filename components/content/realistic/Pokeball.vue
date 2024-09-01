<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf', { draco: true })
</script>

<template>
  <primitive :object="scene" />
</template>
