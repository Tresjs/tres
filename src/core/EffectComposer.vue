<script setup lang="ts">
import { HalfFloatType } from 'three'
import type { TresObject } from '@tresjs/core'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { DepthDownsamplingPass, EffectComposer as EffectComposerImpl, NormalPass, RenderPass } from 'postprocessing'

import { isWebGL2Available } from 'three-stdlib'
import type { ShallowRef } from 'vue'
import { computed, provide, shallowRef, watch, onUnmounted, watchEffect, onMounted } from 'vue'
import { effectComposerInjectionKey } from './injectionKeys'

export interface EffectComposerProps {
  enabled?: boolean
  children?: TresObject[]
  depthBuffer?: boolean
  disableNormalPass?: boolean
  stencilBuffer?: boolean
  resolutionScale?: number
  autoClear?: boolean
  multisampling?: number
  frameBufferType?: number
}

const props = withDefaults(defineProps<EffectComposerProps>(), {
  enabled: true,
  autoClear: true,
  frameBufferType: HalfFloatType,
  disableNormalPass: false,

  depthBuffer: undefined,
  multisampling: 0,
  stencilBuffer: undefined,
})
const { scene, camera, renderer, sizes } = useTresContext()

const effectComposer: ShallowRef<EffectComposerImpl | null> = shallowRef(null)

let downSamplingPass: DepthDownsamplingPass | null = null
let normalPass: NormalPass | null = null

provide(effectComposerInjectionKey, effectComposer)

const setNormalPass = () => {
  if (!effectComposer.value) return

  normalPass = new NormalPass(scene.value, camera.value)
  normalPass.enabled = false
  effectComposer.value.addPass(normalPass)
  if (props.resolutionScale !== undefined && isWebGL2Available()) {
    downSamplingPass = new DepthDownsamplingPass({
      normalBuffer: normalPass.texture,
      resolutionScale: props.resolutionScale,
    })
    downSamplingPass.enabled = false
    effectComposer.value.addPass(downSamplingPass)
  }
}

watchEffect(() => {
  if (effectComposer.value && sizes.width.value && sizes.height.value)
    effectComposer.value.setSize(sizes.width.value, sizes.height.value)
})

const effectComposerParams = computed(() => {
  const plainEffectComposer = new EffectComposerImpl()
  const params = {
    depthBuffer: props.depthBuffer !== undefined ? props.depthBuffer : plainEffectComposer.inputBuffer.depthBuffer,
    stencilBuffer:
      props.stencilBuffer !== undefined ? props.stencilBuffer : plainEffectComposer.inputBuffer.stencilBuffer,
    multisampling: isWebGL2Available()
      ? 0
      : props.multisampling !== undefined
        ? props.multisampling
        : plainEffectComposer.multisampling,
    frameBufferType: props.frameBufferType !== undefined ? props.frameBufferType : HalfFloatType,
  }
  plainEffectComposer.dispose()

  return params
})

const initEffectComposer = () => {
  if (!renderer.value && !scene.value && !camera.value) return

  effectComposer.value = new EffectComposerImpl(renderer.value, effectComposerParams.value)
  effectComposer.value.addPass(new RenderPass(scene.value, camera.value))

  if (!props.disableNormalPass) setNormalPass()
}

let stop = () => { } // defining this prevents error in watcher

stop = watch([sizes.height, sizes.width], () => {
  // effect composer should only live once the canvas has a size > 0
  if (!sizes.height.value && !sizes.width.value) return

  watchEffect(initEffectComposer)
  stop?.()
}, {
  immediate: true
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (props.enabled && renderer.value && effectComposer.value && sizes.width.value && sizes.height.value) {
    const currentAutoClear = renderer.value.autoClear
    renderer.value.autoClear = props.autoClear
    if (props.stencilBuffer && !props.autoClear) renderer.value.clearStencil()
    effectComposer.value.render(delta)
    renderer.value.autoClear = currentAutoClear
  }
})

onUnmounted(() => {
  effectComposer.value?.dispose()
})
</script>

<template>
  <slot />
</template>
