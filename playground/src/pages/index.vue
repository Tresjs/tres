<script setup lang="ts">
import TheClouds from '../components/Clouds.vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
import { shallowRef, onMounted } from 'vue'

const canvas = shallowRef()
const gl = {
  clearColor: '#000',
  alpha: true,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}
</script>
<template>
  <TresCanvas v-bind="gl" ref="canvas">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <Suspense>
      <TheClouds />
    </Suspense>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <OrbitControls enableDamping />
  </TresCanvas>
</template>
