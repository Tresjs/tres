<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import TakeOverLoopExperience from './TakeOverRenderExperience.vue'

const uuid = 'core-advanced-takeover-render-index'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph', { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas v-bind="gl">
    <TakeOverLoopExperience />
  </TresCanvas>
</template>
