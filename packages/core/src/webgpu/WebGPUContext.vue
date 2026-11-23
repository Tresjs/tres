<script setup lang="ts">
import { shallowRef } from 'vue'
import type { TresRendererSetupContext } from '../composables'
import type { TresCanvasInstance } from '../components/BaseCanvas.vue'
import type { ContextEmits } from '../components/Context.vue'
import Context from '../components/Context.vue'
import { forwardContext } from '../components/forwardContextEmits'
import { createWebGPURenderer } from './renderer'
import type { TresWebGPUCanvasProps } from './TresCanvas.vue'

const props = defineProps<TresWebGPUCanvasProps & { canvas: HTMLCanvasElement }>()

const emit = defineEmits<ContextEmits>()

defineSlots<{
  default: () => any
}>()

const child = shallowRef<TresCanvasInstance>()
const { listeners, exposed } = forwardContext(emit, child)

defineExpose<TresCanvasInstance>(exposed)

const createDefaultRenderer = (ctx: TresRendererSetupContext) => createWebGPURenderer(ctx, props)
</script>

<template>
  <Context
    ref="child"
    v-bind="props"
    :renderer="props.renderer ?? createDefaultRenderer"
    v-on="listeners"
  >
    <slot></slot>
  </Context>
</template>
