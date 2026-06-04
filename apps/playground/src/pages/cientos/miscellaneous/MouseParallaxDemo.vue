<script setup lang="ts">
import { MouseParallax, TorusKnot } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

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
    <TresPerspectiveCamera
      :position="[0, 0, 7.5]"
    />
    <TorusKnot>
      <TresMeshNormalMaterial />
    </TorusKnot>
    <MouseParallax :factor="[3, 15]" :ease="[3, 0.5]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
