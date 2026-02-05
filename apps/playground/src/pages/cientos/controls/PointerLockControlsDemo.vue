<!-- eslint-disable no-console -->
<script setup lang="ts">
import { PointerLockControls, Sky } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const isActive = (state: boolean) => console.log('is-active', state)
const hasChange = (state: any) => console.log('change', state)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <Sky />
    <PointerLockControls
      make-default
      @is-lock="state => isActive(state)"
      @change="state => hasChange(state)"
    />

    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
