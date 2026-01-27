<script setup lang="ts">
import { Billboard, Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { Vector3 } from 'three'

const uuid = inject(`uuid`)

const COUNT = 5 * 5
const positions = Array.from({ length: COUNT }).fill(0).map((_, i) => {
  return new Vector3(
    i % 5 - 2,
    Math.floor(i / 5) - 2,
    0,
  )
})

const { lockX, lockY, lockZ } = useControls({
  lockX: false,
  lockY: false,
  lockZ: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#222">
    <OrbitControls />
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <Billboard v-for="position, i of positions" :key="i" :position="position" :lock-x="lockX" :lock-y="lockY" :lock-z="lockZ">
      <Box :scale="[0.5, 0.5, 0.001]">
        <TresMeshNormalMaterial />
      </Box>
    </Billboard>
  </TresCanvas>
</template>
