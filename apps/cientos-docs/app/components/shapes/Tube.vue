<script setup lang="ts">
import { OrbitControls, Tube } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { CubicBezierCurve3, DoubleSide, Vector3 } from 'three'
import { ref } from 'vue'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const tubePath = ref(
  new CubicBezierCurve3(
    new Vector3(-1, 0, 0),
    new Vector3(-0.5, -1, 0),
    new Vector3(0.5, 1, 0),
    new Vector3(1, 0, 0),
  ),
)

const { tubularSegments, radius, radialSegments, closed, showWireframe } = useControls({
  tubularSegments: { value: 20, min: 3, max: 256, step: 1 },
  radius: { value: 0.2, min: 0.05, max: 2, step: 0.05 },
  radialSegments: { value: 8, min: 3, max: 64, step: 1 },
  closed: false,
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Tube :args="[tubePath, tubularSegments, radius, radialSegments, closed]">
      <TresMeshToonMaterial color="orange" :side="DoubleSide" :wireframe="showWireframe" />
    </Tube>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
