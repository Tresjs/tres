<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'leches-controls-number'

const { basicNumber, withStep, withMinMax, clamped, integer, customFormat, degFormat } = useControls({
  // Basic number (default step 0.1)
  basicNumber: 5,
  // Custom step
  withStep: {
    value: 0,
    step: 0.01,
  },
  // Min/max bounds
  withMinMax: {
    value: 0,
    min: -10,
    max: 10,
    step: 0.5,
  },
  // Clamped to positive
  clamped: {
    value: 1,
    min: 0,
    max: 100,
    step: 1,
  },
  // Integer step
  integer: {
    value: 10,
    step: 1,
  },
  // Custom format function
  customFormat: {
    value: 0.5,
    step: 0.001,
    format: (v: number) => `${(v * 100).toFixed(1)}%`,
  },
  // Degrees format
  degFormat: {
    value: 45,
    step: 1,
    format: (v: number) => `${v.toFixed(0)}°`,
  },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[4, 4, 4]" />
    <TresMesh
      :position="[basicNumber.value * 0.1, 0, 0]"
      :rotation="[0, degFormat.value * (Math.PI / 180), 0]"
      :scale="[
        customFormat.value + 0.5,
        customFormat.value + 0.5,
        customFormat.value + 0.5,
      ]"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial
        :color="`hsl(${clamped.value * 3.6}, 70%, 50%)`"
        :metalness="withStep.value"
        :roughness="1 - withStep.value"
      />
    </TresMesh>
    <TresMesh :position="[0, -0.5, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshStandardMaterial color="#333" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
