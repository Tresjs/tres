<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshGlassMaterial, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.4, 256, 20]" />
      <MeshGlassMaterial />
    </TresMesh>
    <TresMesh :position="[0, 0, -1]">
      <TresPlaneGeometry :args="[5, 5]" />
      <TresMeshBasicMaterial :color="0xFF1111" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight />
    <TresDirectionalLight :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>
