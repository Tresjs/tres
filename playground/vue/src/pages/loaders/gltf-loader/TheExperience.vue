<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import BlenderCube from './BlenderCube.vue'
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <BlenderCube />
</template>
