<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PointerLockControls, Sphere } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <button id="lock">Lock</button>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <PointerLockControls selector="lock" />
    <Sphere>
      <TresMeshNormalMaterial />
    </Sphere>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
