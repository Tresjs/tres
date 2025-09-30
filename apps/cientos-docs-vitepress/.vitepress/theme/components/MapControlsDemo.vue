<script setup lang="ts">
import { MapControls, Sphere } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <MapControls />
    <TresGridHelper />
    <Sphere :scale="0.5">
      <TresMeshNormalMaterial />
    </Sphere>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
