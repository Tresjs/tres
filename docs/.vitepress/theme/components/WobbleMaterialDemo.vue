<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshWobbleMaterial, OrbitControls } from '@tresjs/cientos'
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
