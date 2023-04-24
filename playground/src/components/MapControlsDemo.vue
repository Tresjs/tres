<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MapControls, Sphere } from '@cientos'
import { sRGBEncoding, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <MapControls />
    <Sphere :scale="0.5">
      <TresMeshNormalMaterial />
    </Sphere>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
