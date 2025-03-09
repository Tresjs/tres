<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { DepthOfFieldPmndrs, EffectComposerPmndrs, VignettePmndrs } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import BlenderCube from '../../components/BlenderCube.vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { darkness, offset } = useControls({
  offset: {
    value: 0.3,
    min: 0,
    max: 1,
    step: 0.01,
  },
  darkness: {
    value: 0.9,
    min: 0,
    max: 1,
    step: 0.01,
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Suspense>
      <BlenderCube />
    </Suspense>
    <EffectComposerPmndrs>
      <DepthOfFieldPmndrs
        :focus-distance="0"
        :focal-length="0.02"
        :bokeh-scale="2"
      />
      <VignettePmndrs
        :darkness="darkness"
        :offset="offset"
      />
    </EffectComposerPmndrs>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
