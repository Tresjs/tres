<script setup lang="ts">
import { Superformula, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Superformula
      :width-segments="64"
      :height-segments="64"
      :num-arms-a="5"
      :exp-a="[40, 1.3, 0.9]"
      color="orange"
    />
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
