<script setup lang="ts">
import { shallowRef } from 'vue'
import type { TresRendererSetupContext } from '../composables'
import { createWebGLRenderer, extendWithThree } from '../webgl/renderer'
import type { TresCanvasInstance } from './BaseCanvas.vue'
import type { ContextEmits, ContextProps } from './Context.vue'
import Context from './Context.vue'
import { forwardContext } from './forwardContextEmits'

const props = defineProps<ContextProps & { canvas: HTMLCanvasElement }>()

const emit = defineEmits<ContextEmits>()

defineSlots<{
  default: () => any
}>()

const child = shallowRef<TresCanvasInstance>()
const { listeners, exposed } = forwardContext(emit, child)

defineExpose<TresCanvasInstance>(exposed)

extendWithThree()

const createDefaultRenderer = (ctx: TresRendererSetupContext) => createWebGLRenderer(ctx, props)
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
