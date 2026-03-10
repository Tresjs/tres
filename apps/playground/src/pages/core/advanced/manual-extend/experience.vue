<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" />
  <OrbitControls />
  <TresMesh>
    <TresBoxGeometry />
    <TresMeshStandardMaterial color="hotpink" />
  </TresMesh>
</template>
