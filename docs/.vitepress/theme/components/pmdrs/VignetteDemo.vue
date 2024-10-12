<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { DepthOfField, EffectComposer, Vignette } from '@tresjs/post-processing/pmndrs'
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
    <Suspense>
      <BlenderCube />
    </Suspense>
    <EffectComposer ref="effectComposer">
      <DepthOfField :focus-distance="0" :focal-length="0.02" :bokeh-scale="2" />
      <Vignette :darkness="0.9" :offset="0.3" />
    </EffectComposer>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
