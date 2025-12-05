<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshReflectionMaterial, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <MeshReflectionMaterial
        :blur="[300, 100]"
        :mixBlur="30"
        :mixStrength="80"
        :mixContrast="1"
        color="#a0a0a0"
        :metalness="0.5"
        :roughness="1"
        mirror="0"
      />
    </TresMesh>
    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
