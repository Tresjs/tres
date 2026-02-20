<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { createTresApp } from '@tresjs/core'
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
} from 'three'
import Experience from './experience.vue'

const canvasRef = ref<HTMLCanvasElement>()
let root: ReturnType<typeof createTresApp>

onMounted(() => {
  if (!canvasRef.value) { return }

  root = createTresApp(canvasRef.value, { windowSize: true })
  root
    .extend({ AmbientLight, BoxGeometry, DirectionalLight, GridHelper, Mesh, MeshStandardMaterial, PerspectiveCamera })
    .render(Experience)
})

onUnmounted(() => {
  root?.dispose()
})
</script>

<template>
  <canvas ref="canvasRef" />
</template>
