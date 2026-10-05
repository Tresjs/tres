<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { version } from '../../package.json' with { type: 'json' }
import type { TresContext } from '../composables'
import type { ContextEmits, ContextProps } from './Context.vue'
import Context from './Context.vue'
import { tresCanvasDefaults } from './tresCanvasDefaults'

export type TresCanvasEmits = ContextEmits
export type TresCanvasProps = ContextProps

export interface TresCanvasInstance {
  get context(): TresContext | undefined
  dispose: () => void
}

const props = withDefaults(defineProps<TresCanvasProps>(), tresCanvasDefaults)

const emit = defineEmits<TresCanvasEmits>()

defineSlots<{
  default: () => any
}>()

const canvasRef = ref<HTMLCanvasElement>()
const contextRef = shallowRef<{ context: TresContext, dispose: () => void }>()

defineExpose<TresCanvasInstance>({
  get context() {
    return contextRef.value?.context
  },
  dispose: () => contextRef.value?.dispose(),
})
</script>

<template>
  <canvas
    ref="canvasRef"
    :data-scene="contextRef?.context?.scene.value.uuid"
    :class="$attrs.class"
    :data-tres="`tresjs ${version}`"
    :style="{
      display: 'block',
      width: '100%',
      height: '100%',
      position: windowSize ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      pointerEvents: 'auto',
      touchAction: 'none',
      ...$attrs.style as Object,
    }"
  >
    <Context
      v-if="canvasRef"
      ref="contextRef"
      :canvas="canvasRef"
      v-bind="props"
      @ready="emit('ready', $event)"
      @error="emit('error', $event)"
      @pointermissed="emit('pointermissed', $event)"
      @render="emit('render', $event)"
      @before-loop="emit('beforeLoop', $event)"
      @loop="emit('loop', $event)"
      @click="emit('click', $event)"
      @contextmenu="emit('contextmenu', $event)"
      @pointermove="emit('pointermove', $event)"
      @pointerenter="emit('pointerenter', $event)"
      @pointerleave="emit('pointerleave', $event)"
      @pointerover="emit('pointerover', $event)"
      @pointerout="emit('pointerout', $event)"
      @dblclick="emit('dblclick', $event)"
      @pointerdown="emit('pointerdown', $event)"
      @pointerup="emit('pointerup', $event)"
      @pointercancel="emit('pointercancel', $event)"
      @lostpointercapture="emit('lostpointercapture', $event)"
      @wheel="emit('wheel', $event)"
    >
      <slot></slot>
    </Context>
  </canvas>
</template>
