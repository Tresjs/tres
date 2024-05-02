<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { OrbitControls } from '@tresjs/cientos'
import '@tresjs/leches/styles'

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
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <!--  <Fbo
      ref="fboRef"
      v-bind="state"
    /> -->

    <FBOCube />
    <AnimatedObjectUseUpdate />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
