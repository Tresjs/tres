<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshGlassMaterial, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh>
      <TresTorusKnotGeometry />
      <MeshGlassMaterial />
    </TresMesh>
    <TresMesh :position="[0, 0, -3]">
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshStandardMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
