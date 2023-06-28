<script setup lang="ts">
import TresScene from './TresScene.vue'
import { CameraType, useTresProvider } from '../composables'
import { ColorSpace, ShadowMapType, ToneMapping } from 'three'
import { RendererPresetsType } from '../composables/useRenderer/const'

export type TresCanvasProps = {
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
    camera?: CameraType
}

defineProps<TresCanvasProps>()

const tres = useTresProvider()

defineExpose(tres)
</script>
<template>
<TresScene v-bind="$props">
    <slot />
</TresScene>
</template>