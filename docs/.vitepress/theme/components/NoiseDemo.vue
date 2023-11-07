<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { EffectComposer, Noise } from '@tresjs/post-processing'
import { OrbitControls } from '@tresjs/cientos'
import { BlendFunction } from 'postprocessing'
import '@tresjs/leches/styles'

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
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposer :depth-buffer="true">
        <Noise
          premultiply
          :blend-function="BlendFunction.SCREEN"
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>