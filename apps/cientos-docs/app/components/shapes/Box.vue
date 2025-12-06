<script setup lang="ts">
import { Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Box>
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
