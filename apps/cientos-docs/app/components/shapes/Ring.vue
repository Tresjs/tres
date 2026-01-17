<script setup lang="ts">
import { OrbitControls, Ring } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength, showWireframe } = useControls({
  innerRadius: { value: 0.5, min: 0.1, max: 5, step: 0.1 },
  outerRadius: { value: 1.5, min: 0.1, max: 10, step: 0.1 },
  thetaSegments: { value: 8, min: 3, max: 64, step: 1 },
  phiSegments: { value: 1, min: 1, max: 32, step: 1 },
  thetaStart: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  thetaLength: { value: Math.PI * 2, min: 0.01, max: Math.PI * 2, step: 0.01 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Ring :args="[innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength]">
        <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
      </Ring>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
</template>
