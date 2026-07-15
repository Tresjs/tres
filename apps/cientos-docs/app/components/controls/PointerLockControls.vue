<script setup lang="ts">
import { Box, PointerLockControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { maxPolarAngle, minPolarAngle, pointerSpeed } = useControls({
  maxPolarAngle: { value: Math.PI, min: 0, max: Math.PI, step: 0.1 },
  minPolarAngle: { value: 0, min: 0, max: Math.PI, step: 0.1 },
  pointerSpeed: { value: 1, min: 0.1, max: 5, step: 0.1 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <PointerLockControls
      :max-polar-angle="maxPolarAngle"
      :min-polar-angle="minPolarAngle"
      :pointer-speed="pointerSpeed"
    />
  </TresCanvas>
</template>
