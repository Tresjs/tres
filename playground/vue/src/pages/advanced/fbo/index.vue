<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import FBOCube from './FBOCube.vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <!--  <Fbo
      ref="fboRef"
      v-bind="state"
    /> -->

    <FBOCube />
    <AnimatedObjectUseUpdate />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
