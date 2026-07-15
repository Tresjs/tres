<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'leches-controls-color'

const { clearColor } = useControls({
  clearColor: '#82DBC5',
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas :clearColor="clearColor">
    <TresPerspectiveCamera :position="[4, 4, 4]" />
    <TresMesh>
      <TresTorusKnotGeometry />
      <TresMeshStandardMaterial />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
