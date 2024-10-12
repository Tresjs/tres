<script lang="ts">
import type { EffectComposer } from 'postprocessing'
import type { InjectionKey, ShallowRef } from 'vue'
import { useLoop, useTresContext } from '@tresjs/core'
import { DepthDownsamplingPass, EffectComposer as EffectComposerImpl, NormalPass, RenderPass } from 'postprocessing'

import { HalfFloatType } from 'three'

import WEBGL from 'three/examples/jsm/capabilities/WebGL.js'

import { computed, onUnmounted, provide, shallowRef, watch } from 'vue'

export const effectComposerInjectionKey: InjectionKey<ShallowRef<EffectComposer | null>> = Symbol('effectComposer')

export interface EffectComposerProps {
  enabled?: boolean
  depthBuffer?: boolean
  disableNormalPass?: boolean
  stencilBuffer?: boolean
  resolutionScale?: number
  autoClear?: boolean
  multisampling?: number
  frameBufferType?: number
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<EffectComposerProps>(), {
  enabled: true,
  autoClear: true,
  frameBufferType: HalfFloatType,
  disableNormalPass: false,
  depthBuffer: undefined,
  multisampling: 0,
  stencilBuffer: undefined,
})
const emit = defineEmits(['render'])

const { scene, camera, renderer, sizes, render: renderCtx } = useTresContext()

const effectComposer: ShallowRef<EffectComposerImpl | null> = shallowRef(null)

let downSamplingPass: DepthDownsamplingPass | null = null
let normalPass: NormalPass | null = null

provide(effectComposerInjectionKey, effectComposer)
defineExpose({ composer: effectComposer })

const setNormalPass = () => {
  if (!effectComposer.value) { return }

  normalPass = new NormalPass(scene.value, camera.value)
  normalPass.enabled = false
  effectComposer.value.addPass(normalPass)
  if (props.resolutionScale !== undefined && WEBGL.isWebGL2Available()) {
    downSamplingPass = new DepthDownsamplingPass({
      normalBuffer: normalPass.texture,
      resolutionScale: props.resolutionScale,
    })
    downSamplingPass.enabled = false
    effectComposer.value.addPass(downSamplingPass)
  }
}

const effectComposerParams = computed(() => {
  const plainEffectComposer = new EffectComposerImpl()
  const params = {
    depthBuffer: props.depthBuffer !== undefined ? props.depthBuffer : plainEffectComposer.inputBuffer.depthBuffer,
    stencilBuffer:
      props.stencilBuffer !== undefined ? props.stencilBuffer : plainEffectComposer.inputBuffer.stencilBuffer,
    multisampling: WEBGL.isWebGL2Available()
      ? props.multisampling !== undefined
        ? props.multisampling
        : plainEffectComposer.multisampling
      : 0,
    frameBufferType: props.frameBufferType !== undefined ? props.frameBufferType : HalfFloatType,
  }
  plainEffectComposer.dispose()

  return params
})

const initEffectComposer = () => {
  if (!renderer.value && !scene.value && !camera.value) { return }

  effectComposer.value?.dispose()
  effectComposer.value = new EffectComposerImpl(renderer.value, effectComposerParams.value)
  effectComposer.value.addPass(new RenderPass(scene.value, camera.value))

  if (!props.disableNormalPass) { setNormalPass() }
}

watch([renderer, scene, camera, () => props.disableNormalPass], () => {
  if (!sizes.width.value || !sizes.height.value) { return }

  initEffectComposer()
})

watch(() => [sizes.width.value, sizes.height.value], ([width, height]) => {
  // effect composer should only live once the canvas has a size > 0
  if (!width && !height) { return }
  if (effectComposer.value) { effectComposer.value.setSize(width, height) }
  else { initEffectComposer() }
}, {
  immediate: true,
})

const { render } = useLoop()

render(() => {
  if (props.enabled && renderer.value && effectComposer.value && sizes.width.value && sizes.height.value && renderCtx.frames.value > 0) {
    const currentAutoClear = renderer.value.autoClear
    renderer.value.autoClear = props.autoClear
    if (props.stencilBuffer && !props.autoClear) { renderer.value.clearStencil() }
    effectComposer.value.render()
    emit('render', effectComposer.value)
    renderer.value.autoClear = currentAutoClear
  }

  renderCtx.frames.value = renderCtx.mode.value === 'always'
    ? 1
    : Math.max(0, renderCtx.frames.value - 1)
})

onUnmounted(() => {
  effectComposer.value?.dispose()
})
</script>

<template>
  <slot></slot>
</template>
