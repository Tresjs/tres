<script setup lang="ts">
import { MeshWobbleMaterial, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial
        color="orange"
        :speed="1"
        :factor="2"
      />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>
