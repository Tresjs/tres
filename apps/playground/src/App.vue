<script setup lang="ts">
import {
  TresCanvas,
  TresMesh,
  TresSphereGeometry,
  TresMeshToonMaterial,
  TresPerspectiveCamera,
  TresAmbientLight,
  TresDirectionalLight,
  useTres,
} from '@tresjs/core'

const gl = {
  clearColor: 'teal',
  antialias: true,
  alpha: true,
  stencil: true,
  depth: true,
  powerPreference: 'high-performance',
  premultipliedAlpha: true,
  preserveDrawingBuffer: true,
  logarithmicDepthBuffer: true,
}

const { gl: glContext, camera } = useTres()
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresAmbientLight color="white" />
    <TresDirectionalLight color="white" :position="[-2, 2, 3]" />
    <TresMesh>
      <TresSphereGeometry :args="[1, 1, 32, 32]" />
      <TresMeshToonMaterial color="gold" />
    </TresMesh>
  </TresCanvas>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}
</style>
