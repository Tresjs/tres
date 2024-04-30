<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TakeOverLoopExperience />
  </TresCanvas>
</template>
