<script setup lang="ts">
import { OrbitControls, Stars } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas clear-color="#111">
    <TresPerspectiveCamera :position="[0, 5, 10]" />
    <OrbitControls />
    <Stars />
    <TresGridHelper :args="[10, 20]" />
  </TresCanvas>
</template>
