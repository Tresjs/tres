<script setup lang="ts">
import { Circle, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { radius, segments, thetaStart, thetaLength, showWireframe } = useControls({
  radius: { value: 1, min: 0.1, max: 5, step: 0.1 },
  segments: { value: 32, min: 3, max: 128, step: 1 },
  thetaStart: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  thetaLength: { value: Math.PI * 2, min: 0.01, max: Math.PI * 2, step: 0.01 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Circle :args="[radius, segments, thetaStart, thetaLength]">
      <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
    </Circle>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
