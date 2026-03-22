<script setup lang="ts">
import * as THREE from 'three'
import { ACESFilmicToneMapping, PCFSoftShadowMap } from 'three'
import { ref, shallowRef } from 'vue'
import { version } from '../../package.json' with { type: 'json' }
import type { TresContext } from '../composables'
import type { ContextEmits, ContextProps } from './Context.vue'
import Context from './Context.vue'
import { extend } from '../core/catalogue'

const props = withDefaults(defineProps<TresCanvasProps>(), {
  alpha: undefined,
  depth: undefined,
  shadows: undefined,
  stencil: undefined,
  antialias: true,
  windowSize: undefined,
  useLegacyLights: undefined,
  preserveDrawingBuffer: undefined,
  logarithmicDepthBuffer: undefined,
  failIfMajorPerformanceCaveat: undefined,
  renderMode: 'always',
  clearColor: '#000000',
  clearAlpha: 1,
  enableProvideBridge: true, // We should probably move to options in next major version
  toneMapping: ACESFilmicToneMapping,
  shadowMapType: PCFSoftShadowMap,
  options: {
    primitivePrefix: '',
  },
})

const emit = defineEmits<TresCanvasEmits>()

defineSlots<{
  default: () => any
}>()

extend(THREE)

export type TresCanvasEmits = ContextEmits
export type TresCanvasProps = ContextProps

export interface TresCanvasInstance {
  get context(): TresContext | undefined
  dispose: () => void
}

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
