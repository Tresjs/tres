<script setup lang="ts">
import { OrbitControls, Sphere } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { radius, widthSegments, heightSegments, thetaStart, thetaLength, phiStart, phiLength, showWireframe } = useControls({
  radius: { value: 1, min: 0.1, max: 5, step: 0.1 },
  widthSegments: { value: 16, min: 3, max: 64, step: 1 },
  heightSegments: { value: 12, min: 2, max: 64, step: 1 },
  thetaStart: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  thetaLength: { value: Math.PI * 2, min: 0.01, max: Math.PI * 2, step: 0.01 },
  phiStart: { value: 0, min: 0, max: Math.PI, step: 0.01 },
  phiLength: { value: Math.PI, min: 0.01, max: Math.PI, step: 0.01 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Sphere :args="[radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength]">
      <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
    </Sphere>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
