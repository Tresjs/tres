<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const { clearColor } = useControls({
  clearColor: '#82DBC5',
})
</script>

<template>
  <TresLeches />
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
