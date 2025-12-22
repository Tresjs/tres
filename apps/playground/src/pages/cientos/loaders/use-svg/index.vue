<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import TheModel from './TheModel.vue'
</script>

<template>
  <div class="w-full h-full relative">
    <TresCanvas
      clear-color="#333"
      render-mode="on-demand"
    >
      <TresPerspectiveCamera :position="[0, 2, 10]" />
      <TresGridHelper :args="[10, 10]" />

      <!-- Show different demos based on mode -->
      <TheModel />

      <TresAmbientLight />
      <TresDirectionalLight />
      <OrbitControls />
    </TresCanvas>
  </div>
</template>
