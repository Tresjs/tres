<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { OrbitControls } from '@tresjs/cientos'
import DemoContactShadows from './DemoContactShadows.vue'

const gl = {
  clearColor: '#fff',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <DemoContactShadows />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
