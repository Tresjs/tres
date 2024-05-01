<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import Feather from './Feather.vue'

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
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[1, 2, 1]" />
    <Suspense>
      <Feather />
    </Suspense>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[2, 2, 2]"
    />
    <OrbitControls />
  </TresCanvas>
</template>
