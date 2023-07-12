<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, Backdrop } from '@tresjs/cientos'

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
    <Backdrop :floor="1.5" :scale="[20, 5, 5]">
        <TresMeshPhysicalMaterial  :roughness="1" color="#efefef" :side="2" />
    </Backdrop>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>