<script setup lang="ts">
import { Box, MapControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { enableDamping, dampingFactor, autoRotate, autoRotateSpeed, enablePan, enableZoom, zoomSpeed, enableRotate, rotateSpeed, maxAzimuthAngle, minAzimuthAngle, maxPolarAngle, minPolarAngle, minDistance, maxDistance, minZoom, maxZoom } = useControls({
  enableDamping: true,
  dampingFactor: { value: 0.05, min: 0, max: 0.2, step: 0.01 },
  autoRotate: false,
  autoRotateSpeed: { value: 2, min: 0, max: 10, step: 0.5 },
  enablePan: true,
  enableZoom: true,
  zoomSpeed: { value: 1, min: 0, max: 5, step: 0.1 },
  enableRotate: true,
  rotateSpeed: { value: 1, min: 0, max: 5, step: 0.1 },
  maxAzimuthAngle: { value: Infinity, min: -Math.PI * 2, max: Math.PI * 2, step: 0.1 },
  minAzimuthAngle: { value: -Infinity, min: -Math.PI * 2, max: Math.PI * 2, step: 0.1 },
  maxPolarAngle: { value: Math.PI, min: 0, max: Math.PI, step: 0.1 },
  minPolarAngle: { value: 0, min: 0, max: Math.PI, step: 0.1 },
  minDistance: { value: 0, min: 0, max: 20, step: 0.5 },
  maxDistance: { value: Infinity, min: 5, max: 100, step: 1 },
  minZoom: { value: 0, min: 0, max: 10, step: 0.1 },
  maxZoom: { value: Infinity, min: 5, max: 100, step: 1 },
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <MapControls
        :enable-damping="enableDamping"
        :damping-factor="dampingFactor"
        :auto-rotate="autoRotate"
        :auto-rotate-speed="autoRotateSpeed"
        :enable-pan="enablePan"
        :enable-zoom="enableZoom"
        :zoom-speed="zoomSpeed"
        :enable-rotate="enableRotate"
        :rotate-speed="rotateSpeed"
        :max-azimuth-angle="maxAzimuthAngle"
        :min-azimuth-angle="minAzimuthAngle"
        :max-polar-angle="maxPolarAngle"
        :min-polar-angle="minPolarAngle"
        :min-distance="minDistance"
        :max-distance="maxDistance"
        :min-zoom="minZoom"
        :max-zoom="maxZoom"
      />
      <Box :scale="2">
        <TresMeshToonMaterial color="orange" />
      </Box>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
