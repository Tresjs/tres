<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import FBOCube from './FBOCube.vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const groupRef = ref()

let direction = 1
const move = () => {
  groupRef.value.position.y += 0.02 * direction
  if (groupRef.value.position.y > 1) {
    direction = -1
  }
  else if (groupRef.value.position.y < -1) {
    direction = 1
  }
}
</script>

<template>
  <TresCanvas v-bind="gl" @loop="move">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <!--  <Fbo
      ref="fboRef"
      v-bind="state"
    /> -->

    <TresGroup ref="groupRef">
      <FBOCube />
    </TresGroup>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
