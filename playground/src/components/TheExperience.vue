<script setup lang="ts">
import { reactive, ref, watchEffect, provide } from 'vue'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
import { TresCanvas } from '/@/'
import TheSphere from './TheSphere.vue'
import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const context = ref()

watchEffect(() => {
  if (context.value) {
    console.log({ context: context.value })
  }
})
</script>

<template>
  <TresCanvas v-bind="gl" ref="context">
    <TresPerspectiveCamera :position="[7, 7, 7]" :look-at="[0, 4, 0]" />
    <OrbitControls />
    <TresMesh :position="[-2, 6, 0]" :rotation="[0, Math.PI, 0]" cast-shadow>
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh :position="[0, 4, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TheSphere />
    <TresAxesHelper :args="[1]" />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
  </TresCanvas>
</template>
