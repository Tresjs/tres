<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import Text3D from './Text3D.vue'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { isVisible } = useControls({
  isVisible: true,
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Suspense>
      <Text3D v-if="isVisible" />
    </Suspense>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
