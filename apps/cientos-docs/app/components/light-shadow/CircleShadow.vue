<script setup lang="ts">
import { CircleShadow, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresGroup :position-y="-0.5">
      <TresMesh :position-y="1">
        <TresBoxGeometry />
        <TresMeshToonMaterial color="orange" />
      </TresMesh>
      <CircleShadow :scale="1.5" />
    </TresGroup>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
