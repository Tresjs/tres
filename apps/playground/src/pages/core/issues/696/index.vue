<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <OrbitControls />
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresDirectionalLight :intensity="1" :position="[0, 3, 3]" />
    <TresMesh :position="[0, 1, 0]" :rotation="[0, 0.5, 0]" :scale="2">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
