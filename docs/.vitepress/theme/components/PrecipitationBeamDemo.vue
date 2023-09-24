<script setup lang="ts">
import { shallowRef, reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const precipitationRef = shallowRef()
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      ref="precipitationRef"
      :position="[0, 3, 7.5]"
      :randomness="0"
      :speed="0.5"
      :count="2000"
      :area="[1, 10, 1]"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
