<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { DepthOfFieldPmndrs, EffectComposerPmndrs, VignettePmndrs } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

import BlenderCube from '../BlenderCube.vue'

const gl = {
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const { effectComposer } = useRouteDisposal()
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <BlenderCube />
    <EffectComposerPmndrs ref="effectComposer">
      <DepthOfFieldPmndrs :focus-distance="0" :focal-length="0.02" :bokeh-scale="2" />
      <VignettePmndrs :darkness="0.9" :offset="0.3" />
    </EffectComposerPmndrs>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
