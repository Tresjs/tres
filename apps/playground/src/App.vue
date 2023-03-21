<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 2000]" :position="[3, 3, 4]" />
    <OrbitControls />
    <TresAmbientLight :args="[0xffffff, 0.5]" />
    <TresDirectionalLight :args="[0xffffff, 0.5]" />
    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshToonMaterial :color="'teal'" />
    </TresMesh>
  </TresCanvas>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
