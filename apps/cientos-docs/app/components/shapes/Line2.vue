<script setup lang="ts">
import { Line2, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Line2
      :points="[
        [-0.5, 0, 0],
        [0.5, 0, 0],
        [0, 0.866, 0],
        [-0.5, 0, 0],
      ]"
      :line-width="10"
      color="orange"
    />
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
