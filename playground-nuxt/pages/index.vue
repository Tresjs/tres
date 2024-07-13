<script setup lang="ts">
import { BlendFunction } from 'postprocessing'
import { BasicShadowMap, Color, NoToneMapping, SRGBColorSpace } from 'three'
import { reactive } from 'vue'
import { Bloom, EffectComposer } from '@tresjs/post-processing'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const bloomParams = reactive({
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.3,
  intensity: 4.0,
  blendFunction: BlendFunction.ADD,
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
    window-size
  >
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        color="hotpink"
        :emissive="new Color('hotpink')"
        :emissive-intensity="9"
      />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposer>
        <Bloom v-bind="bloomParams" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
