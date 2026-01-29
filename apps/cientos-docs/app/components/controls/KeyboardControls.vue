<script setup lang="ts">
import { Box, KeyboardControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { moveSpeed } = useControls({
  moveSpeed: { value: 0.1, min: 0.01, max: 1, step: 0.05 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 2, 8]" :look-at="[0, 0, 0]" />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <KeyboardControls :move-speed="moveSpeed" />
    <TresGridHelper />
  </TresCanvas>
</template>
