<script setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import UgglyBunny from '../../components/UgglyBunny.vue'

const gl = {
  clearColor: '#F78B3D',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  windowSize: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[2, 2, 9]"
      :look-at="[0, 2, 0]"
    />
    <OrbitControls />
    <Suspense>
      <UgglyBunny />
    </Suspense>
    <TresDirectionalLight
      color="#F78B3D"
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>
