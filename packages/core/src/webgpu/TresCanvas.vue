<script setup lang="ts">
import * as THREE_WEBGPU from 'three/webgpu'
import { shallowRef, toValue } from 'vue'
import type { TresRendererSetupContext } from '../composables'
import type { TresCanvasEmits, TresCanvasInstance, TresCanvasProps } from '../components/TresCanvas.vue'
// Not named `TresCanvas`: the template compiler treats every `Tres*` tag as a Three.js element.
import RootCanvas from '../components/TresCanvas.vue'
import { tresCanvasDefaults } from '../components/tresCanvasDefaults'
import { extend } from '../core/catalogue'
import { toWebGPURendererParameters } from './renderer'

const props = withDefaults(defineProps<TresCanvasProps>(), tresCanvasDefaults)

const emit = defineEmits<TresCanvasEmits>()

defineSlots<{
  default: () => any
}>()

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
  </RootCanvas>
</template>
