<script setup lang="ts">
import { Grid, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const gl = {
  clearColor: '#000000',
}

const cellColor = shallowRef('#000000')
const sectionColor = shallowRef('#000000')
const cellThickness = shallowRef(0)
const sectionThickness = shallowRef(0)
const cellSize = shallowRef(0)
const sectionSize = shallowRef(0)
let elapsed = 0
setInterval(() => {
  elapsed += 1000 / 30
  cellColor.value = Math.cos(elapsed * 0.01) > 0 ? '#FFFF00' : '#FF0000'
  sectionColor.value = Math.sin(elapsed * 0.01) > 0 ? '#FF0000' : '#00FF00'
  sectionThickness.value = Math.cos(elapsed * 0.003) + 1
  cellThickness.value = Math.cos(elapsed * 0.001) + 1
  cellSize.value = Math.sin(elapsed * 0.0001) + 2
  sectionSize.value = Math.cos(elapsed * 0.0001) + 2
}, 1000 / 30)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[15, 18, 18]" :fov="25" />
    <OrbitControls />
    <Grid
      :args="[10.5, 10.5]"
      :cell-size="cellSize"
      :cell-color="cellColor"
      :cell-thickness="cellThickness"
      :section-size="sectionSize"
      :section-thickness="sectionThickness"
      :section-color="sectionColor"
      :infinite-grid="true"
      :fade-from="0"
      :fade-distance="12"
      :fade-strength="1"
    />
  </TresCanvas>
</template>
