<script setup lang="ts">
import { Box, KeyboardControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { moveSpeed } = useControls({
  moveSpeed: { value: 0.1, min: 0.01, max: 1, step: 0.05 },
})
</script>

<template>
  <div class="aspect-16/9">
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
  </div>
  <TresLeches :float="false" />
</template>
