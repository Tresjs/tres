<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import TheModel from './TheModel.vue'
</script>

<template>
  <TresPerspectiveCamera :position="[8, 8, 8]" />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <TheModel />
</template>
