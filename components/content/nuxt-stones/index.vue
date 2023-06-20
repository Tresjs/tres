<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { EffectComposer, Bloom } from '@tresjs/post-processing'

import Stones from './Stones.vue'
import Floor from './Floor.vue'

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
  intensity: 0.5,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[-5.3, 8.3, 10.6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Suspense>
      <EffectComposer :depth-buffer="true">
        <Bloom v-bind="bloomParams"></Bloom>
      </EffectComposer>
    </Suspense>
    <Suspense>
      <Stones />
    </Suspense>
  </TresCanvas>
</template>
