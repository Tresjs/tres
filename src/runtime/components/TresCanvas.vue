<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas as TC } from '@tresjs/core'
import type { TresCamera } from '@tresjs/core'
import { ACESFilmicToneMapping, PCFSoftShadowMap, SRGBColorSpace } from 'three'
import type { ColorSpace, ShadowMapType, ToneMapping, WebGLRendererParameters } from 'three'

defineProps<TresCanvasProps>()

const rendererPresets = {
  realistic: {
    outputColorSpace: SRGBColorSpace,
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 3,
    shadowMap: {
      enabled: true,
      type: PCFSoftShadowMap,
    },
  },
}

type RendererPresetsType = keyof typeof rendererPresets

interface TresCanvasProps extends Omit<WebGLRendererParameters, 'canvas'> {
  // required by for useRenderer
  shadows?: boolean
  clearColor?: string
  toneMapping?: ToneMapping
  shadowMapType?: ShadowMapType
  useLegacyLights?: boolean
  outputColorSpace?: ColorSpace
  toneMappingExposure?: number

  // required by useTresContextProvider
  windowSize?: boolean
  preset?: RendererPresetsType
  disableRender?: boolean
  camera?: TresCamera
}
const stateRef = ref()

defineExpose({
  state: stateRef,
})
</script>

<template>
  <ClientOnly>
    <TC
      ref="stateRef"
      v-bind="$props"
    >
      <slot />
    </TC>
  </ClientOnly>
</template>
