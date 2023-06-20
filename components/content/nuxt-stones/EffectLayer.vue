<script setup lang="ts">
import { useTres, useRenderLoop } from '@tresjs/core';
import { useWindowSize } from '@vueuse/core'

import {
  BloomEffect,
  RenderPass,
  EffectPass,
  EffectComposer,
  BlendFunction,
NormalPass,
DepthDownsamplingPass
} from 'postprocessing'
import { HalfFloatType } from 'three';

const bloomParams = reactive({
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 0.1,
  blendFunction: BlendFunction.ADD,
})

const { width, height } = useWindowSize()

const { state } = useTres()

let effectComposer
let activePass
const { onLoop } = useRenderLoop()

watchEffect(() => {
  if (state.renderer) {
    state.renderer.autoClear = true
    effectComposer = new EffectComposer(state.renderer, {
      frameBufferType: HalfFloatType,
      multisampling: 8,
      depthBuffer: true,
      stencilBuffer: true
    })
    effectComposer.setSize(width.value, height.value)
    const normalPass = new NormalPass(state.scene, state.camera)
    normalPass.enabled = false
    effectComposer.addPass(normalPass)

    effectComposer.addPass(new RenderPass(state.scene, state.camera))
    effectComposer.addPass(new EffectPass(state.camera, new BloomEffect(bloomParams)))
    activePass = effectComposer.passes[1]

    onLoop(() => {
      effectComposer.render()
    }) 
  }
})
</script>
<template>
</template>