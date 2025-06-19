<script setup lang="ts">
// import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import FBOCube from './FBOCube.vue'
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
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <!-- <OrbitControls /> -->
    <!--  <Fbo
      ref="fboRef"
      v-bind="state"
    /> -->

    <FBOCube />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
