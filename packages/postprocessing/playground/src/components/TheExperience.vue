<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Glitch } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

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
  <TresCanvas
    v-bind="gl"
    disable-render
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposer>
        <Glitch />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
