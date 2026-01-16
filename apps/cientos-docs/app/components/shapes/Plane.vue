<script setup lang="ts">
import { OrbitControls, Plane } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { width, height, widthSegments, heightSegments, showWireframe } = useControls({
  width: { value: 5, min: 0.1, max: 20, step: 0.1 },
  height: { value: 5, min: 0.1, max: 20, step: 0.1 },
  widthSegments: { value: 1, min: 1, max: 64, step: 1 },
  heightSegments: { value: 1, min: 1, max: 64, step: 1 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Plane :args="[width, height, widthSegments, heightSegments]">
        <TresMeshToonMaterial color="orange" :wireframe="showWireframe" />
      </Plane>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
</template>
