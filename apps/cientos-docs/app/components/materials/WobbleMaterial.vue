<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshWobbleMaterial, OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { speed, factor, color } = useControls({
  speed: { value: 1, min: 0, max: 5, step: 0.1 },
  factor: { value: 0.6, min: 0, max: 2, step: 0.1 },
  color: '#ff8800',
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial :color="color" :speed="speed" :factor="factor" />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
