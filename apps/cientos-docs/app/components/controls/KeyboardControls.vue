<script setup lang="ts">
import { Box, KeyboardControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 2, 8]" :look-at="[0, 0, 0]" />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <KeyboardControls />
    <TresGridHelper />
  </TresCanvas>
</template>
