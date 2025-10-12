<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { BlendFunction } from 'postprocessing'

const gl = {
  clearColor: '#8D404A',
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const bloomParams = reactive({
  luminanceThreshold: 0.1,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 0.4,
  radius: 0.5,
  disableRender: true,
  blendFunction: BlendFunction.ADD,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 1, 5]" :look-at="[0, 0.4, 0]" />
    <CultOfTheLambModel />

    <TresAmbientLight :args="[0xffffff, 0.5]" />

    <Suspense>
      <EffectComposerPmndrs>
        <BloomPmndrs v-bind="bloomParams" />
      </EffectComposerPmndrs>
    </Suspense>
    <CultOfTheLambRitual />

    <Backdrop :floor="1.5" :segments="20" :scale="[20, 8, 4]" :position="[0, -0.01, -4]">
      <TresMeshStandardMaterial color="#8D404A" :roughness="1" />
    </Backdrop>
    <TheScreenshot />
  </TresCanvas>
</template>