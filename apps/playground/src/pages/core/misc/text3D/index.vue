<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import Text3D from './Text3D.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { isVisible, text } = useControls({
  isVisible: true,
  text: 'TresJS',
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Text3D v-if="isVisible" :text="text" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
