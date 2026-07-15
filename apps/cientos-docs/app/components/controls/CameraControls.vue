<script setup lang="ts">
import { Box, CameraControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { minPolarAngle, maxPolarAngle, minAzimuthAngle, maxAzimuthAngle, minDistance, maxDistance, minZoom, maxZoom, smoothTime, azimuthRotateSpeed, polarRotateSpeed, dollySpeed, truckSpeed } = useControls({
  minPolarAngle: { value: 0, min: 0, max: Math.PI, step: 0.1 },
  maxPolarAngle: { value: Math.PI, min: 0, max: Math.PI, step: 0.1 },
  minAzimuthAngle: { value: -Infinity, min: -Math.PI * 2, max: Math.PI * 2, step: 0.1 },
  maxAzimuthAngle: { value: Infinity, min: -Math.PI * 2, max: Math.PI * 2, step: 0.1 },
  minDistance: { value: 0.001, min: 0, max: 20, step: 0.5 },
  maxDistance: { value: 100, min: 5, max: 500, step: 5 },
  minZoom: { value: 0.01, min: 0.01, max: 1, step: 0.01 },
  maxZoom: { value: Infinity, min: 5, max: 100, step: 5 },
  smoothTime: { value: 0.25, min: 0, max: 2, step: 0.05 },
  azimuthRotateSpeed: { value: 1.0, min: 0, max: 5, step: 0.1 },
  polarRotateSpeed: { value: 1.0, min: 0, max: 5, step: 0.1 },
  dollySpeed: { value: 1.0, min: 0, max: 5, step: 0.1 },
  truckSpeed: { value: 2.0, min: 0, max: 10, step: 0.5 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <CameraControls
      make-default
      :min-polar-angle="minPolarAngle"
      :max-polar-angle="maxPolarAngle"
      :min-azimuth-angle="minAzimuthAngle"
      :max-azimuth-angle="maxAzimuthAngle"
      :min-distance="minDistance"
      :max-distance="maxDistance"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :smooth-time="smoothTime"
      :azimuth-rotate-speed="azimuthRotateSpeed"
      :polar-rotate-speed="polarRotateSpeed"
      :dolly-speed="dollySpeed"
      :truck-speed="truckSpeed"
    />
    <TresGridHelper :position="[0, -1, 0]" />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
