<script setup lang="ts">
import { Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { width, height, depth, widthSegments, heightSegments, depthSegments, showWireframe } = useControls({
  width: { value: 1, min: 0.1, max: 5, step: 0.1 },
  height: { value: 1, min: 0.1, max: 5, step: 0.1 },
  depth: { value: 1, min: 0.1, max: 5, step: 0.1 },
  widthSegments: { value: 1, min: 1, max: 32, step: 1 },
  heightSegments: { value: 1, min: 1, max: 32, step: 1 },
  depthSegments: { value: 1, min: 1, max: 32, step: 1 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Box :args="[width, height, depth, widthSegments, heightSegments, depthSegments]" :widthSegments="widthSegments">
      <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
