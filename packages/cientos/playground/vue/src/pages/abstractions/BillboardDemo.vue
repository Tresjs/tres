<script setup lang="ts">
import { Billboard, Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Vector3 } from 'three'
import '@tresjs/leches/styles'

const COUNT = 5 * 5
const positions = Array.from({ length: COUNT }).fill(0).map((_, i) => {
  return new Vector3(
    i % 5 - 2,
    Math.floor(i / 5) - 2,
    0,
  )
})
</script>

<template>
  <TresCanvas clear-color="#333333">
    <OrbitControls />
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <Billboard v-for="position, i of positions" :key="i" :position="position">
      <Box :scale="[0.5, 0.5, 0.001]">
        <TresMeshNormalMaterial />
      </Box>
    </Billboard>
  </TresCanvas>
</template>
