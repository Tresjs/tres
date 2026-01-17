<script setup lang="ts">
import { Cone, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength, showWireframe } = useControls({
  radius: { value: 1, min: 0.1, max: 5, step: 0.1 },
  height: { value: 2, min: 0.1, max: 10, step: 0.1 },
  radialSegments: { value: 16, min: 3, max: 64, step: 1 },
  heightSegments: { value: 1, min: 1, max: 32, step: 1 },
  openEnded: false,
  thetaStart: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  thetaLength: { value: Math.PI * 2, min: 0.01, max: Math.PI * 2, step: 0.01 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Cone :args="[radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]">
        <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
      </Cone>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
</template>
