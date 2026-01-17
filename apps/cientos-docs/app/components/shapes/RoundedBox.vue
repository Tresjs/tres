<script setup lang="ts">
import { OrbitControls, RoundedBox } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { width, height, depth, radius, segments, showWireframe } = useControls({
  width: { value: 1, min: 0.1, max: 5, step: 0.1 },
  height: { value: 1, min: 0.1, max: 5, step: 0.1 },
  depth: { value: 1, min: 0.1, max: 5, step: 0.1 },
  radius: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
  segments: { value: 2, min: 1, max: 16, step: 1 },
  showWireframe: false,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[0, 0, 3]" />
      <OrbitControls />
      <RoundedBox :args="[width, height, depth, segments, radius]">
        <TresMeshBasicMaterial color="orange" :wireframe="showWireframe" />
      </RoundedBox>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
</template>
