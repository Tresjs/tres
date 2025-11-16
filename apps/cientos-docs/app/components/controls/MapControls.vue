<script setup lang="ts">
import { Box, MapControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <MapControls />
      <Box :scale="2">
        <TresMeshToonMaterial color="orange" />
      </Box>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper />
    </TresCanvas>
</template>
