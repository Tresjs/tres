<script setup lang="ts">
import { WebGPURenderer } from 'three/webgpu'
import { shallowRef, toValue } from 'vue'
import type { TresRendererSetupContext } from '../composables'
import type { TresCanvasEmits, TresCanvasInstance, TresCanvasProps } from '../components/TresCanvas.vue'
// Not named `TresCanvas`: the template compiler treats every `Tres*` tag as a Tres component.
import RootCanvas from '../components/TresCanvas.vue'
import { forwardContextEmits } from '../components/forwardContextEmits'
import { tresCanvasDefaults } from '../components/tresCanvasDefaults'
import { toWebGPURendererParameters } from './renderer'

const props = withDefaults(defineProps<TresCanvasProps>(), tresCanvasDefaults)

const emit = defineEmits<TresCanvasEmits>()

defineSlots<{
  default: () => any
}>()

const contextListeners = forwardContextEmits(emit)

const createWebGPURenderer = (ctx: TresRendererSetupContext) => new WebGPURenderer({
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
