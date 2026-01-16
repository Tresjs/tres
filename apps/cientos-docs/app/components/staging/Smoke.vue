<script setup lang="ts">
import { OrbitControls, Smoke } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const {
  segments,
  opacity,
  speed,
  depth,
  color,
  depthTest,
  spreadY,
  spreadX,
  scale,
} = useControls(
  {
    segments: {
      label: 'Segments',
      value: 5,
      min: 1,
      max: 20,
      step: 1,
    },
    opacity: {
      label: 'Opacity',
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    speed: {
      label: 'Speed',
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.1,
    },
    depth: {
      label: 'Depth',
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.1,
    },
    color: {
      type: 'color',
      label: 'Color',
      value: '#f7f7f7',
    },
    depthTest: {
      type: 'boolean',
      label: 'Depth Test',
      value: false,
    },
    spreadY: {
      label: 'Spread Y',
      value: 0.1,
      min: 0,
      max: 4,
      step: 0.1,
    },
    spreadX: {
      label: 'Spread X',
      value: 0.5,
      min: 0,
      max: 4,
      step: 0.1,
    },
    scale: {
      label: 'Scale',
      value: 1,
      min: 0.1,
      max: 4,
      step: 0.1,
    },
  },
  { uuid },
)
</script>

<template>
  <TresCanvas clear-color="#111">
    <TresPerspectiveCamera :position="[0, 1.25, 2.5]" />
    <OrbitControls />
    <Suspense>
      <Smoke
        :segments="segments"
        :opacity="opacity"
        :speed="speed"
        :depth="depth"
        :color="color"
        :depth-test="depthTest"
        :spreadY="spreadY"
        :spreadX="spreadX"
        :scale="scale"
      />
    </Suspense>
    <TresAmbientLight :intensity="0.75" />
    <TresGridHelper :args="[10, 20]" />
  </TresCanvas>
</template>
