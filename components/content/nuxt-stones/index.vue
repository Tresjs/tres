<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { BlendFunction } from 'postprocessing'
import Stones from './Stones.vue'

const gl = {
  clearColor: '#18181B',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const bloomParams = reactive({
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 0.3,
  blendFunction: BlendFunction.ADD,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[-5.3, 8.3, 10.6]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <Suspense>
      <EffectComposer>
        <Bloom v-bind="bloomParams" />
      </EffectComposer>
    </Suspense>
    <!-- <EffectLayer /> -->
    <Suspense>
      <Stones />
    </Suspense>
  </TresCanvas>
</template>
