<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas  } from '@tresjs/core'
import {  PointerLockControls  } from '@cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const controls = shallowRef<null | PointerLockControls>(null)

watch(controls, value => {
  console.log('controls', value)
})


</script>

<template>
  <!-- <button id="test">hola</button> -->
  <TresCanvas v-bind="gl">
    <PointerLockControls selector="test" ref="controls" />
    <TresPerspectiveCamera :position="[0, 3, 3]" />
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
<style>

</style>