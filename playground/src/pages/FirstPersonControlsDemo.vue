<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping } from 'three'
import { PointerLockControls, KeyboardControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const isActive = (state: boolean) => console.log(state)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <PointerLockControls
      make-default
      @is-lock="state => isActive(state)"
    />
    <KeyboardControls head-bobbing />

    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
