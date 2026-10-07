<script setup lang="ts">
import * as THREE_WEBGPU from 'three/webgpu'
import { shallowRef, toValue } from 'vue'
import type { TresRendererSetupContext } from '../composables'
import type { TresCanvasEmits, TresCanvasInstance, TresCanvasProps } from '../components/TresCanvas.vue'
// Not named `TresCanvas`: the template compiler treats every `Tres*` tag as a Tres component.
import RootCanvas from '../components/TresCanvas.vue'
import { forwardContextEmits } from '../components/forwardContextEmits'
import { tresCanvasDefaults } from '../components/tresCanvasDefaults'
import { extend } from '../core/catalogue'
import { toWebGPURendererParameters } from './renderer'

const props = withDefaults(defineProps<TresCanvasProps>(), tresCanvasDefaults)

const emit = defineEmits<TresCanvasEmits>()

defineSlots<{
  default: () => any
}>()

const contextListeners = forwardContextEmits(emit)

// The root Context extends the catalogue with `three` afterwards. Both namespaces share
// their classes through `three.core.js`, so only `PMREMGenerator` (not used as a tag) ends
// up as the WebGL class.
extend(THREE_WEBGPU)

const createWebGPURenderer = (ctx: TresRendererSetupContext) => new THREE_WEBGPU.WebGPURenderer({
  ...toWebGPURendererParameters(props),
  canvas: toValue(ctx.canvas),
})

const canvasRef = shallowRef<TresCanvasInstance>()

defineExpose<TresCanvasInstance>({
  get context() {
    return canvasRef.value?.context
  },
  dispose: () => canvasRef.value?.dispose(),
})
</script>

<template>
  <RootCanvas
    ref="canvasRef"
    v-bind="props"
    :renderer="props.renderer ?? createWebGPURenderer"
    v-on="contextListeners"
  >
    <slot></slot>
  </RootCanvas>
</template>
