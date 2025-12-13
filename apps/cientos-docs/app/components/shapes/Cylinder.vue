<script setup lang="ts">
import { Cylinder, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength, showWireframe } = useControls({
  radiusTop: { value: 1, min: 0.1, max: 5, step: 0.1 },
  radiusBottom: { value: 1, min: 0.1, max: 5, step: 0.1 },
  height: { value: 2, min: 0.1, max: 10, step: 0.1 },
  radialSegments: { value: 16, min: 3, max: 64, step: 1 },
  heightSegments: { value: 1, min: 1, max: 32, step: 1 },
  openEnded: false,
  thetaStart: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  thetaLength: { value: Math.PI * 2, min: 0.01, max: Math.PI * 2, step: 0.01 },
  showWireframe: false,
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Cylinder :args="[radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]">
        <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
      </Cylinder>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
