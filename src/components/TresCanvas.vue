<script setup lang="ts">
import TresScene from './TresScene.vue'
import { useTresProvider } from '../composables'

import type { TresCamera } from '../types/'
import type { RendererPresetsType } from '../composables/useRenderer/const'
import type { ColorSpace, ShadowMapType, ToneMapping } from 'three'

export interface TresCanvasProps {
    shadows?: boolean
    shadowMapType?: ShadowMapType
    physicallyCorrectLights?: boolean
    useLegacyLights?: boolean
    outputColorSpace?: ColorSpace
    toneMapping?: ToneMapping
    toneMappingExposure?: number
    context?: WebGLRenderingContext
    powerPreference?: 'high-performance' | 'low-power' | 'default'
    preserveDrawingBuffer?: boolean
    clearColor?: string
    windowSize?: boolean
    preset?: RendererPresetsType
    disableRender?: boolean
    camera?: TresCamera
}

const props = defineProps<TresCanvasProps>()

const tres = useTresProvider()

defineExpose(tres)
</script>
<template>
    <TresScene v-bind="props">
        <slot />
    </TresScene>
</template>