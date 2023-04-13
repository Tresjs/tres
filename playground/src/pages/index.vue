<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
import TheStars from "../components/TheStars.vue"

const gl = {
  clearColor: '#333',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TheStars />
    <OrbitControls />
  </TresCanvas>
</template>
