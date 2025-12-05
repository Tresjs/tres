<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshWobbleMaterial, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial color="orange" :speed="1" :factor="0.6" />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
