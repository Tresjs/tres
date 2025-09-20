<script setup lang="ts">
import { Box, KeyboardControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const isActive = (state: boolean) => {
  // eslint-disable-next-line no-console
  console.log(state)
}
const hasChange = (state: any) => {
  // eslint-disable-next-line no-console
  console.log('change', state)
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <!-- <Sky /> -->
    <KeyboardControls
      @change="state => hasChange(state)"
      @is-lock="state => isActive(state)"
    />
    <Box />
    <Box :position="[15, 0, 0]" />
    <Box :position="[-15, 0, 0]" />

    <TresAxesHelper
      :args="[10]"
      :position-y="5"
    />
    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
