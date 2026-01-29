<script setup lang="ts">
import { Grid, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { cellSize, cellThickness, cellColor, sectionSize, sectionThickness, sectionColor, followCamera, infiniteGrid, fadeDistance, fadeStrength, fadeFrom } = useControls({
  cellSize: { value: 0.6, min: 0.1, max: 2, step: 0.1 },
  cellThickness: { value: 0.5, min: 0.1, max: 2, step: 0.1 },
  cellColor: '#82dbc5',
  sectionSize: { value: 2, min: 0.5, max: 5, step: 0.1 },
  sectionThickness: { value: 1.3, min: 0.1, max: 2, step: 0.1 },
  sectionColor: '#fbb03b',
  followCamera: false,
  infiniteGrid: true,
  fadeDistance: { value: 12, min: 0, max: 100, step: 1 },
  fadeStrength: { value: 1, min: 0, max: 2, step: 0.1 },
  fadeFrom: { value: 0, min: 0, max: 1, step: 0.1 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#222222">
    <TresPerspectiveCamera :position="[8, 10, 10]" :fov="25" />
    <OrbitControls />
    <Grid
      :args="[10.5, 10.5]"
      :cell-color="cellColor"
      :cell-size="cellSize"
      :cell-thickness="cellThickness"
      :section-color="sectionColor"
      :section-size="sectionSize"
      :section-thickness="sectionThickness"
      :infinite-grid="infiniteGrid"
      :fade-from="fadeFrom"
      :fade-distance="fadeDistance"
      :fade-strength="fadeStrength"
      :follow-camera="followCamera"
    />
  </TresCanvas>
</template>
