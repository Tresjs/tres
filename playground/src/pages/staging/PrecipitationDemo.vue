<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Precipitation } from '@tresjs/cientos'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const precipitationRef = shallowRef()

const options = reactive({
  speed: 1,
  randomness: 0,
  count: 1000,
  size: 0.1,
  areaX: 25,
  areaY: 25,
  areaZ: 25,
})

const { speed, randomness, count, size, areaX, areaY, areaZ } = useControls({
  speed: {
    value: options.speed,
    step: 0.1,
    min: 0,
    max: 10,
  },
  randomness: {
    value: options.randomness,
    step: 0.1,
    min: 0,
    max: 10,
  },
  count: {
    value: options.count,
    step: 10,
    min: 500,
    max: 30000,
  },
  size: {
    value: options.size,
    step: 0.001,
    min: 0.001,
    max: 1,
  },
  areaX: {
    value: options.areaX,
    step: 1,
    min: 1,
    max: 30,
  },
  areaY: {
    value: options.areaY,
    step: 1,
    min: 1,
    max: 30,
  },
  areaZ: {
    value: options.areaZ,
    step: 1,
    min: 1,
    max: 30,
  },
})

watch([speed.value, randomness.value, count.value, size.value, areaX.value, areaY.value, areaZ.value], () => {
  options.speed = speed.value.value
  options.randomness = randomness.value.value
  options.count = count.value.value
  options.size = size.value.value
  options.areaX = areaX.value.value
  options.areaY = areaY.value.value
  options.areaZ = areaZ.value.value
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      ref="precipitationRef"
      :speed="options.speed"
      :area="[options.areaX, options.areaY, options.areaZ]"
      :count="options.count"
      :randomness="options.randomness"
      :size="options.size"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
