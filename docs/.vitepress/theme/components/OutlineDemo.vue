<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Outline } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#4f4f4f">
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresAmbientLight :intensity="3.14" />
    <TresPointLight :intensity="50" :position="[2, 2, 0]" />
    <TresMesh :position-x="-0.75">
      <TresBoxGeometry />
      <TresMeshPhongMaterial />
      <Outline :thickness="7.5" color="#82dbc5" />
    </TresMesh>
    <TresMesh :position-x="0.75">
      <TresSphereGeometry :args="[0.5]" />
      <TresMeshPhongMaterial />
      <Outline :thickness="7.5" color="#fbb03b" />
    </TresMesh>
  </TresCanvas>
</template>
