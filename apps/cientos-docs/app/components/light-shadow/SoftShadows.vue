<script setup lang="ts">
import { SoftShadows, Levioso, TorusKnot, Plane } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas shadows clear-color="#82DBC5">
    <Levioso :speed="4" :range="[0, 0.7]" :rotation-factor="9">
      <TorusKnot cast-shadow :scale="0.45">
        <TresMeshStandardMaterial color="orange" />
      </TorusKnot>
    </Levioso>
    <Plane :position="[0, -2, 0]" receive-shadow :args="[10, 10]">
      <TresMeshStandardMaterial />
    </Plane>
    <TresDirectionalLight cast-shadow :position="[0, 3, 0]" />
    <TresAmbientLight :intensity="0.5" />
    <SoftShadows />
  </TresCanvas>
</template>
