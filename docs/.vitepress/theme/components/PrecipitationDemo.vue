<script setup lang="ts">
import { shallowRef, reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Precipitation } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

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
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
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
