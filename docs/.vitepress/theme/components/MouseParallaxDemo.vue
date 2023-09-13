<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { MouseParallax, TorusKnot } from '@tresjs/cientos'

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
      :fov="75"
      :near="0.1"
      :far="1000"
    />
    <TorusKnot>
      <TresMeshNormalMaterial />
    </TorusKnot>
    <MouseParallax
      :factor="5"
      :ease="3"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>