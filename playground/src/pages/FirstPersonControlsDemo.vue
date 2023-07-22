<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping } from 'three'
import { PointerLockControls, KeyboardControls } from '@tresjs/cientos'

const PLControlsRef = ref<PointerLockControls | null>(null)

watch(PLControlsRef, value => {
  console.log(value)
})

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}
const isLock = ref(false)

watchEffect(() => {
  console.log('jaime ~ isLock:', isLock.value)
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <PointerLockControls ref="PLControlsRef" v-model="isLock" make-default  />
    <KeyboardControls head-bobbing />

    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
