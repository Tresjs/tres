<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Outline } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { color, screenspace, opacity, transparent, thickness, angle } = useControls({
  color: '#82dbc5',
  screenspace: false,
  opacity: { value: 1, min: 0, max: 1, step: 0.1 },
  transparent: false,
  thickness: { value: 7.5, min: 0, max: 20, step: 0.5 },
  angle: { value: Math.PI, min: 0, max: Math.PI, step: 0.1 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#4f4f4f">
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresAmbientLight :intensity="3.14" />
    <TresPointLight :intensity="50" :position="[2, 2, 0]" />
    <TresMesh :position-x="-0.75">
      <TresBoxGeometry />
      <TresMeshPhongMaterial />
      <Outline :thickness="thickness" :color="color" :screenspace="screenspace" :opacity="opacity" :transparent="transparent" :angle="angle" />
    </TresMesh>
    <TresMesh :position-x="0.75">
      <TresSphereGeometry :args="[0.5]" />
      <TresMeshPhongMaterial />
      <Outline :thickness="thickness" :color="color" :screenspace="screenspace" :opacity="opacity" :transparent="transparent" :angle="angle" />
    </TresMesh>
  </TresCanvas>
</template>
