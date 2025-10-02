<script setup lang="ts">
import { OrbitControls, QuadraticBezierLine } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { Vector3 } from 'three'

const c = useControls({
  startX: { value: 0, min: -10, max: 10 },
  startY: { value: 0, min: -10, max: 10 },
  startZ: { value: 0, min: -10, max: 10 },
  endX: { value: 3, min: -10, max: 10 },
  endY: { value: 3, min: -10, max: 10 },
  endZ: { value: -3, min: -10, max: 10 },
  moveMid: true,
  lineWidth: { value: 1, min: 0.01, max: 10 },
  enabled: true,
})

const mid = new Vector3(1, 1, 1)
const colors = ref([
  [1.0, 0.0, 0.0],
  [0.9, 0.1, 0.0],
  [0.8, 0.2, 0.0],
  [0.7, 0.3, 0.0],
  [0.6, 0.4, 0.0],
  [0.5, 0.5, 0.0],
  [0.4, 0.6, 0.0],
  [0.3, 0.7, 0.0],
  [0.2, 0.8, 0.0],
  [0.1, 0.9, 0.0],
  [0.0, 1.0, 0.0],
  [0.0, 0.9, 0.1],
  [0.0, 0.8, 0.2],
  [0.0, 0.7, 0.3],
  [0.0, 0.6, 0.4],
  [0.0, 0.5, 0.5],
  [0.0, 0.4, 0.6],
  [0.0, 0.3, 0.7],
  [0.0, 0.2, 0.8],
  [0.0, 0.1, 0.9],
  [0.0, 0.0, 1.0],
  [0.1, 0.0, 0.9],
  [0.2, 0.0, 0.8],
  [0.3, 0.0, 0.7],
  [0.4, 0.0, 0.6],
  [0.5, 0.0, 0.5],
  [0.6, 0.0, 0.4],
  [0.7, 0.0, 0.3],
  [0.8, 0.0, 0.2],
  [0.9, 0.0, 0.1],
])

const dashed = ref(true)
const dashScale = ref(50)

useRenderLoop().onLoop(({ elapsed }) => {
  const lastColor = colors.value.pop()!
  colors.value.unshift(lastColor)

  dashed.value = Math.sin(elapsed * 0.5) < 0
  dashScale.value = 5 + 5 * Math.sin(elapsed)

  if (c.moveMid.value.value) {
    mid.y = Math.sin(elapsed) * 4
  }
})
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#777">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <QuadraticBezierLine
      v-if="c.enabled.value.value"
      :start="[c.startX.value.value, c.startY.value.value, c.startZ.value.value]"
      :end="[c.endX.value.value, c.endY.value.value, c.endZ.value.value]"
      :vertex-colors="colors"
      :world-units="true"
      :line-width="c.lineWidth.value.value"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <TresGridHelper />
  </TresCanvas>
</template>
