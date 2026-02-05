<script setup lang="ts">
import { TresCanvas, TresRendererError, type TresRendererSetupContext } from '@tresjs/core'
import { WebGPURenderer } from 'three/webgpu'
import type { ShadowMapType, ToneMapping } from 'three'
import { ACESFilmicToneMapping, AgXToneMapping, BasicShadowMap, CineonToneMapping, LinearToneMapping, NeutralToneMapping, NoToneMapping, PCFShadowMap, PCFSoftShadowMap, ReinhardToneMapping, VSMShadowMap } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

import HologramCube from './HologramCube.vue'

const uuid = 'core-advanced-webgpu'

const createWebGPURenderer = (ctx: TresRendererSetupContext) =>
  new WebGPURenderer({
    canvas: toValue(ctx.canvas),
    // WebGPU specific configuration
    alpha: true,
    antialias: true,
  })

const { clearColor, clearAlpha, toneMapping, shadows, shadowMapType } = useControls({
  clearColor: '#000000',
  clearAlpha: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
    label: 'Clear Alpha',
  },
  toneMapping: {
    value: ACESFilmicToneMapping,
    options: [
      { text: 'No Tone Mapping', value: NoToneMapping },
      { text: 'Linear', value: LinearToneMapping },
      { text: 'Reinhard', value: ReinhardToneMapping },
      { text: 'Cineon', value: CineonToneMapping },
      { text: 'ACES Filmic', value: ACESFilmicToneMapping },
      { text: 'AgX', value: AgXToneMapping }, // New in Three.js r155
      { text: 'Neutral', value: NeutralToneMapping },
    ],
  },
  shadows: true,
  shadowMapType: {
    value: PCFSoftShadowMap,
    options: [
      { text: 'Basic', value: BasicShadowMap },
      { text: 'PCF', value: PCFShadowMap },
      { text: 'PCF Soft', value: PCFSoftShadowMap },
      { text: 'VSM', value: VSMShadowMap },
    ],
  },
}, { uuid })

const formattedToneMapping = computed(() => {
  return Number(toneMapping.value) as ToneMapping
})

const formattedShadowMapType = computed(() => {
  return Number(shadowMapType.value) as ShadowMapType
})

// Handle renderer initialization errors (e.g., WebGPU not supported)
const handleRendererError = (error: Error) => {
  if (error instanceof TresRendererError) {
    console.error('Failed to initialize WebGPU renderer:', error.message)
    // You can show a user-friendly error message here
    // For example, display a fallback message or use WebGLRenderer instead
  }
  else {
    console.error('Something went wrong:', error)
  }
}
</script>

<template>
  <TresLeches :uuid="uuid" />

  <TresCanvas :renderer="createWebGPURenderer" :clear-color="clearColor" :clear-alpha="clearAlpha" :tone-mapping="formattedToneMapping" :shadows="shadows" :shadow-map-type="formattedShadowMapType" @error="handleRendererError">
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <Suspense>
      <HologramCube />
    </Suspense>
    <OrbitControls />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
