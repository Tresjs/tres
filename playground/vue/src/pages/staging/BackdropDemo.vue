<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { Backdrop, OrbitControls } from '@tresjs/cientos'

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
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Backdrop
      :floor="1.5"
      :scale="[20, 5, 5]"
    >
      <TresMeshPhysicalMaterial
        :roughness="1"
        color="#efefef"
        :side="2"
      />
    </Backdrop>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
