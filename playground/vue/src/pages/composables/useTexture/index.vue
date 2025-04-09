<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { OrbitControls } from '@tresjs/cientos'

import SimpleTexture from './SimpleTexture.vue'
import MultipleTexture from './MultipleTexture.vue'
import ObjectUseTextureComponent from './ObjectUseTextureComponent.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 1, 16]" />
    <OrbitControls />
    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
    <SimpleTexture />
    <MultipleTexture />
    <ObjectUseTextureComponent />
  </TresCanvas>
</template>
