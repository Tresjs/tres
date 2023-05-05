<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap } from 'three'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { EffectComposer, Bloom } from '@tresjs/post-processing'

const gl = reactive({
  clearColor: '#242424',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  /*   outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping, */
})

const { pane } = useTweakPane()

pane.addInput(gl, 'clearColor', { label: 'Background' })

const bloomParams = reactive({
  luminanceThreshold: 0.1,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 4.0,
  radius: 0.85,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 15, 11]" :look-at="[0, 8, 0]" />
    <OrbitControls />
    <Suspense>
      <Experience />
    </Suspense>
    <TresFog :color="0x242424" :near="1" :far="100" />
    <!--  <EffectComposer>
      <Suspense>
        <Bloom v-bind="bloomParams" />
      </Suspense>
    </EffectComposer> -->
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>
