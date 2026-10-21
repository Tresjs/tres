<script setup lang="ts">
import { shallowRef } from 'vue'
import type { TresRendererSetupContext } from '../composables'
import { createWebGLRenderer, extendWithThree } from '../webgl/renderer'
import type { TresCanvasEmits, TresCanvasInstance, TresCanvasProps } from './BaseCanvas.vue'
import BaseCanvas from './BaseCanvas.vue'
import { forwardContext } from './forwardContextEmits'
import { tresCanvasDefaults } from './tresCanvasDefaults'

const props = withDefaults(defineProps<TresCanvasProps>(), tresCanvasDefaults)

const emit = defineEmits<TresCanvasEmits>()

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
  <BaseCanvas
    ref="child"
    v-bind="props"
    :renderer="props.renderer ?? createDefaultRenderer"
    v-on="listeners"
  >
    <slot></slot>
  </BaseCanvas>
</template>
