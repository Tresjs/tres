<script setup lang="ts">
import { shallowRef, reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Precipitation, useTweakPane } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const precipitationRef = shallowRef()

const { pane } = useTweakPane()

const options = reactive({
  speed: 1,
  randomness: 0,
  count: 1000,
  size: 1,
  areaX: 25,
  areaY: 25,
  areaZ: 25,
})

pane.addInput(options, 'speed', {
  step: 0.1,
  min: 0,
  max: 10,
})

pane.addInput(options, 'randomness', {
  step: 0.1,
  min: 0,
  max: 10,
})
pane.addInput(options, 'count', {
  step: 10,
  min: 500,
  max: 30000,
})
pane.addInput(options, 'size', {
  step: 0.001,
  min: 0.001,
  max: 1,
})
pane.addInput(options, 'areaX', {
  step: 1,
  min: 1,
  max: 30,
})
pane.addInput(options, 'areaY', {
  step: 1,
  min: 1,
  max: 30,
})
pane.addInput(options, 'areaZ', {
  step: 1,
  min: 1,
  max: 30,
})
</script>
<template>
  <TresCanvas v-bind="gl" ref="canvas">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      ref="precipitationRef"
      :speed="options.speed"
      :count="options.count"
      :area="[options.areaX, options.areaY, options.areaZ]"
      :randomness="options.randomness"
      :size="options.size"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
