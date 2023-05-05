<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap} from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { EffectComposer, Bloom } from '@tresjs/post-processing'

const gl = {
  clearColor: '#242424',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
/*   outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping, */
}

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
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Suspense>
        <Experience />
    </Suspense>
    <TresFog :color="0x242424" :near="1" :far="100" />
    <EffectComposer>
        <Bloom v-bind="bloomParams"/>
    </EffectComposer>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>