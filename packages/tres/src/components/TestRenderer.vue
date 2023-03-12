<script setup lang="ts">
import { ref } from 'vue'

const gridVisible = ref(false)

setTimeout(() => {
  gridVisible.value = true
}, 4000)
</script>
<template>
  <TresPerspectiveCamera :args="[75, 1, 0.1, 1000]" :position="[0, 2, 7]"></TresPerspectiveCamera>
  <TresAmbientLight :color="0xffffff" :intensity="0.75" />
  <TresDirectionalLight :color="0xffffff" :intensity="2" :position="[-2, 2, 0]" />
  <TresMesh :position="[0, 1, 0]">
    <TresSphereGeometry :args="[1, 32, 16]"></TresSphereGeometry>
    <TresMeshToonMaterial color="teal"></TresMeshToonMaterial>
  </TresMesh>
  <TresGridHelper v-if="gridVisible" :args="[4, 4]"></TresGridHelper>
</template>
