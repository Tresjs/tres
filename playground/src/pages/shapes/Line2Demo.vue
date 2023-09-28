<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Line2 } from '@tresjs/cientos'

const gl = {
  clearColor: '#888',
}

const NUM_POINTS = 10
const points = ref(new Array(NUM_POINTS).fill(0).map((_, i) => [i * 0.1, 0, 0]))
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

const lineWidth = ref(5)
const dashed = ref(true)
const dashSize = ref(1)
const dashScaleRef = ref(50)
const dashOffset = ref(0)
const gapSize = ref(1)

useRenderLoop().onLoop(({ elapsed }) => {
  points.value.forEach((v, i) => {
    const progress = i * 0.5 + elapsed * 0.25
    v[0] = Math.cos(progress)
    v[1] = Math.sin((progress) * Math.PI * 3) * 0.1
    v[2] = Math.sin(progress)
  })

  const c = colors.value.pop()
  colors.value.unshift(c)

  dashed.value = Math.sin(elapsed * 0.5) < 0
  dashSize.value = 1 * (Math.sin(elapsed) + 1)
  dashScaleRef.value = 25 + 25 * Math.sin(elapsed) 
  dashOffset.value = 1 * (Math.sin(elapsed) + 1)

  lineWidth.value = 0.1 * (Math.sin(elapsed) + 1) + 0.1
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <Line2
      :position="[0, 0, 0]"
      :points="points"
      :vertex-colors="colors"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScaleRef"
      :dash-offset="dashOffset"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
