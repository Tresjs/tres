<script setup lang="ts">
import { ref } from "vue"
import { TresCanvas } from '@tresjs/core'
import {  OrbitControls, Text3D } from '@cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}
const text = ref('hola mundo')
</script>

<template>
  <div class="flex-center">
    <input type="text" maxlength="15" v-model="text">
  </div>
  <TresCanvas v-bind="gl">
    <OrbitControls />
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <Text3D :text="text" :font="fontPath" :position="[-2, 0, 0]" />
    </Suspense>

  </TresCanvas>
</template>
<style>
.flex-center{
  display: flex;
  justify-content: center;
}
</style>