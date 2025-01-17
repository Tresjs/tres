<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const { positionX } = useControls({
  positionX: {
    value: 0,
    min: -5,
    max: 5,
    step: 0.1,
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[4, 4, 4]" />
    <TresMesh :position="[positionX, 0, 0]">
      <TresTorusKnotGeometry />
      <TresMeshStandardMaterial />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
