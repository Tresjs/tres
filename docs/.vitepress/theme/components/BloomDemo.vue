<script setup lang="ts">
import { Color } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BlendFunction } from 'postprocessing'
import { EffectComposer, Bloom } from '/@'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
}

const bloomParams = reactive({
  luminanceThreshold: 0.1,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 8,
  radius: 0.5,
  disableRender: true,
  blendFunction: BlendFunction.ADD,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        ref="materialRef"
        color="hotpink"
        :emissive="new Color('hotpink')"
        :emissive-intensity="1.2"
      />
    </TresMesh>
    <TresGridHelper />

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <Suspense>
      <EffectComposer>
        <Bloom v-bind="bloomParams"> </Bloom>
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
