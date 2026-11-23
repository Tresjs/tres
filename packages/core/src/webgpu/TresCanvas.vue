<script setup lang="ts">
import type { WebGPURenderer } from 'three/webgpu'
import { shallowRef } from 'vue'
import type { TresRendererSetupContext } from '../composables'
import type { TresCanvasEmits, TresCanvasInstance, TresCanvasProps } from '../components/BaseCanvas.vue'
import BaseCanvas from '../components/BaseCanvas.vue'
import { forwardContext } from '../components/forwardContextEmits'
import { tresCanvasDefaults } from '../components/tresCanvasDefaults'
import { createWebGPURenderer } from './renderer'

export interface TresWebGPUCanvasProps extends Omit<TresCanvasProps, 'renderer'> {
  /**
   * Custom renderer factory. It must return a `WebGPURenderer`, because `useTres()` from this entry types the renderer as one.
   */
  renderer?: (ctx: TresRendererSetupContext) => WebGPURenderer
}

const props = withDefaults(defineProps<TresWebGPUCanvasProps>(), tresCanvasDefaults)

const emit = defineEmits<TresCanvasEmits>()

defineSlots<{
  default: () => any
}>()

const child = shallowRef<TresCanvasInstance>()
const { listeners, exposed } = forwardContext(emit, child)

defineExpose<TresCanvasInstance>(exposed)

const createDefaultRenderer = (ctx: TresRendererSetupContext) => createWebGPURenderer(ctx, props)
</script>

<template>
  <BaseCanvas
    ref="child"
    v-bind="props"
    :renderer="props.renderer ?? createDefaultRenderer"
    v-on="listeners"
  >
    <slot></slot>
  </BaseCanvas>
</template>
