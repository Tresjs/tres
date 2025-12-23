<script setup lang="ts">
import { OrbitControls, QuadraticBezierLine } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { Vector3 } from 'three'

const uuid = 'shapes-quadratic-bezier-line'

const {
  startX, startY, startZ, endX, endY, endZ, moveMid, lineWidth, enabled
} = useControls({
  startX: { value: 0, min: -10, max: 10 },
  startY: { value: 0, min: -10, max: 10 },
  startZ: { value: 0, min: -10, max: 10 },
  endX: { value: 3, min: -10, max: 10 },
  endY: { value: 3, min: -10, max: 10 },
  endZ: { value: -3, min: -10, max: 10 },
  moveMid: true,
  lineWidth: { value: 1, min: 0.01, max: 10 },
  enabled: true,
}, { uuid })

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

function onLoop({ elapsed }: { elapsed: number }) {
  const lastColor = colors.value.pop()!
  colors.value.unshift(lastColor)

  dashed.value = Math.sin(elapsed * 0.5) < 0
  dashScale.value = 5 + 5 * Math.sin(elapsed)

  if (moveMid.value) {
    mid.y = Math.sin(elapsed) * 4
  }
}
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#777" @loop="onLoop">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <QuadraticBezierLine
      v-if="enabled"
      :start="[startX, startY, startZ]"
      :end="[endX, endY, endZ]"
      :vertex-colors="colors"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <TresGridHelper />
  </TresCanvas>
</template>
