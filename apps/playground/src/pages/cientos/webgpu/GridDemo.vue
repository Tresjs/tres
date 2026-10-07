<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Box, Grid, OrbitControls } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL Grid.
import { Grid as GlslGrid } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-grid'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const GridComponent = rendererFactory ? GlslGrid : Grid

const {
  cellSize,
  cellThickness,
  cellColor,
  sectionSize,
  sectionThickness,
  sectionColor,
  fadeDistance,
  fadeStrength,
  fadeFrom,
  infiniteGrid,
  followCamera,
} = useControls({
  cellSize: { value: 0.6, min: 0.1, max: 4, step: 0.1 },
  cellThickness: { value: 0.5, min: 0, max: 3, step: 0.1 },
  cellColor: { type: 'color', value: '#82dbc5' },
  sectionSize: { value: 2, min: 0.5, max: 8, step: 0.5 },
  sectionThickness: { value: 1.3, min: 0, max: 3, step: 0.1 },
  sectionColor: { type: 'color', value: '#fbb03b' },
  fadeDistance: { value: 25, min: 1, max: 100, step: 1 },
  fadeStrength: { value: 1, min: 0, max: 4, step: 0.1 },
  fadeFrom: { value: 1, min: 0, max: 1, step: 0.1 },
  infiniteGrid: true,
  followCamera: false,
}, { uuid })

const checks = [
  'A teal cell grid with orange section lines every few cells. Lines stay thin and sharp when you zoom',
  'The grid fades out with distance. `fadeFrom: 0` fades from the origin, `1` from the camera',
  '`infiniteGrid` extends the grid to the fade distance. Off, it is the 10 x 10 plane only',
  '`followCamera` keeps the grid under the camera when you pan with the right mouse button',
  'Every control changes the grid at once, with no shader rebuild stutter',
  'The result matches `renderer: webgl` (the GLSL Grid): same line positions, widths and fade. Thin lines are a little brighter under WebGPU, which blends in linear color space',
  'No errors and no <Grid> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#222222" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[8, 10, 10]" :fov="25" />
    <OrbitControls />
    <Box :position-y="0.5">
      <TresMeshNormalMaterial />
    </Box>
    <component
      :is="GridComponent"
      :args="[10, 10]"
      :cell-size="cellSize"
      :cell-thickness="cellThickness"
      :cell-color="cellColor"
      :section-size="sectionSize"
      :section-thickness="sectionThickness"
      :section-color="sectionColor"
      :fade-distance="fadeDistance"
      :fade-strength="fadeStrength"
      :fade-from="fadeFrom"
      :infinite-grid="infiniteGrid"
      :follow-camera="followCamera"
    />
  </TresCanvas>
</template>
