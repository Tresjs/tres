<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls } from '@tresjs/cientos'
import { EffectComposer, Bloom } from '@tresjs/post-processing'
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
  intensity: 0.3,
  radius: 0.5,
  disableRender: true,
  blendFunction: BlendFunction.ADD,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 1, 5]"
      :look-at="[0, 0.4, 0]"
    />
    <Suspense>
      <Lamb />
    </Suspense>
    <Suspense>
      <Ritual />
    </Suspense>
    <TresAmbientLight :args="[0xffffff, 0.5]" />
    <Suspense>
      <EffectComposer>
        <Bloom v-bind="bloomParams" />
      </EffectComposer>
    </Suspense>
    <Backdrop  
      :floor="1.5" 
      :segments="20"
      :scale="[20, 8, 4]"
      :position="[0, -0.01, -4]"
    >
      <TresMeshStandardMaterial
        color="#8D404A"
        :roughness="1"
      />
    </Backdrop>
  </TresCanvas>
</template>