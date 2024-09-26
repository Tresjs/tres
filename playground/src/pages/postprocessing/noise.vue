<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer, Noise } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const { value: premultiply } = useControls({
  premultiply: true,
})

const { value: blendFunction } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.SCREEN,
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposer :depth-buffer="true">
        <Noise
          :premultiply="premultiply"
          :blend-function="blendFunction"
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
