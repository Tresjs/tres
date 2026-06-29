<script setup lang="ts">
import { OrbitControls, RoundedPlane } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { width, height, radius, segments, showWireframe } = useControls({
  width: { value: 1.5, min: 0.1, max: 5, step: 0.1 },
  height: { value: 1, min: 0.1, max: 5, step: 0.1 },
  radius: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
  segments: { value: 16, min: 1, max: 32, step: 1 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <OrbitControls />
    <RoundedPlane :args="[width, height, radius, segments]">
      <TresMeshBasicMaterial color="orange" :wireframe="showWireframe" />
    </RoundedPlane>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
