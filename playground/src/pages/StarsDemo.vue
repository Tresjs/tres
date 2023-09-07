<script setup lang="ts">
import { shallowRef, reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Stars, MouseParallax, useTweakPane } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const options = reactive({
  size: 0.1,
  sizeAttenuation: true,
  count: 5000,
  depth: 50,
  radius: 100,
})

const { pane } = useTweakPane()

pane.addInput(options, 'radius', {
  step: 5,
  min: 0,
  max: 300,
})
pane.addInput(options, 'depth', {
  step: 1,
  min: 0,
  max: 50,
})
pane.addInput(options, 'count', {
  step: 100,
  min: 1000,
  max: 15000,
})
pane.addInput(options, 'size', {
  step: 0.1,
  min: 0,
  max: 50,
})
pane.addInput(options, 'sizeAttenuation')

const star = shallowRef<Stars>(null)
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <MouseParallax :factor="0.5" />
    <Stars
      ref="star"
      :radius="options.radius"
      :depth="options.depth"
      :count="options.count"
      :size="options.size"
      :size-attenuation="options.sizeAttenuation"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
