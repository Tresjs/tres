<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, NoisePmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

const gl = {
  clearColor: '#82DBC5',
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
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposerPmndrs ref="effectComposer">
        <NoisePmndrs
          premultiply
          :blend-function="BlendFunction.SCREEN"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
