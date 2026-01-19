<script setup lang="ts">
import { OrbitControls, TorusKnot } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { radius, tube, tubularSegments, radialSegments, p, q, showWireframe } = useControls({
  radius: { value: 1, min: 0.1, max: 5, step: 0.1 },
  tube: { value: 0.4, min: 0.05, max: 2, step: 0.05 },
  tubularSegments: { value: 64, min: 3, max: 256, step: 1 },
  radialSegments: { value: 8, min: 3, max: 64, step: 1 },
  p: { value: 2, min: 1, max: 10, step: 1 },
  q: { value: 3, min: 1, max: 10, step: 1 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TorusKnot :args="[radius, tube, tubularSegments, radialSegments, p, q]">
      <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
    </TorusKnot>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
