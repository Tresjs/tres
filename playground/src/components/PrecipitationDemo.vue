<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Precipitation } from '@cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const precipitationRef = shallowRef<Precipitation>(null)

watch(precipitationRef, value => {
  console.log(value)
})
</script>
<template>
  <TresCanvas v-bind="gl" ref="canvas">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
        <Precipitation ref="precipitationRef" :speed="1" :count="1000" :area="[25, 25, 25]" :randomness="0" />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
