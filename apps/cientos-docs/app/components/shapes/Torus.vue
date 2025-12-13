<script setup lang="ts">
import { OrbitControls, Torus } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { radius, tube, radialSegments, tubularSegments, arc, showWireframe } = useControls({
  radius: { value: 1, min: 0.1, max: 5, step: 0.1 },
  tube: { value: 0.4, min: 0.05, max: 2, step: 0.05 },
  radialSegments: { value: 16, min: 3, max: 64, step: 1 },
  tubularSegments: { value: 32, min: 3, max: 128, step: 1 },
  arc: { value: Math.PI * 2, min: 0.1, max: Math.PI * 2, step: 0.1 },
  showWireframe: false,
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Torus :args="[radius, tube, radialSegments, tubularSegments, arc]">
        <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
      </Torus>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
