<script setup lang="ts">
import { CubicBezierLine, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <CubicBezierLine
      :start="[-1, 0, 0]"
      :end="[1, 0, 0]"
      :midA="[-1, 2, -2]"
      :midB="[1, 2, 2]"
      :line-width="10"
      color="orange"
    />
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
