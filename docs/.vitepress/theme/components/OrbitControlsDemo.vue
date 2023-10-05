<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Box } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight
      :position="[0, 2, 4]"
    />
    <TresGridHelper />
  </TresCanvas>
</template>
