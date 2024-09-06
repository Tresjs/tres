<script setup lang="ts">
import { MouseParallax, OrbitControls, Stars } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { reactive, shallowRef } from 'vue'
import '@tresjs/leches/styles'

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

const { radius, depth, count, size, 'size attenuation': sizeAttenuation } = useControls({
  'radius': {
    value: options.radius,
    step: 5,
    min: 0,
    max: 300,
  },
  'depth': {
    value: options.depth,
    step: 1,
    min: 0,
    max: 50,
  },
  'count': {
    value: options.count,
    step: 100,
    min: 1000,
    max: 15000,
  },
  'size': {
    value: options.size,
    step: 0.1,
    min: 0,
    max: 50,
  },
  'size attenuation': options.sizeAttenuation,
})

watch([radius.value, depth.value, count.value, size.value, sizeAttenuation.value], () => {
  options.radius = radius.value.value
  options.depth = depth.value.value
  options.count = count.value.value
  options.size = size.value.value
  options.sizeAttenuation = sizeAttenuation.value.value
})

const star = shallowRef<Stars>(null)
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
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
