<script setup lang="ts">
import { HalfFloatType, Scene } from 'three'
import { TresCamera, TresObject, useRenderLoop } from '@tresjs/core'
import { DepthDownsamplingPass, EffectComposer as EffectComposerImpl, NormalPass, RenderPass } from 'postprocessing'

import { useCore } from './useCore'
import { isWebGL2Available } from 'three-stdlib'
import { useElementBounding } from '@vueuse/core'
import { effectComposerInjectionKey } from './injectionKeys'
import { ShallowRef, computed, provide, shallowRef, watchEffect } from 'vue'

export type EffectComposerProps = {
  enabled?: boolean
  children?: TresObject[]
  depthBuffer?: boolean
  disableNormalPass?: boolean
  stencilBuffer?: boolean
  resolutionScale?: number
  /*   renderPriority?: number */
  autoClear?: boolean
  multisampling?: number
  frameBufferType?: number
  scene?: Scene
  camera?: TresCamera
}

const { state } = useCore()

const {
  enabled = true,
  /*   renderPriority = 1, */
  autoClear = true,
  multisampling = 8,
  frameBufferType = HalfFloatType,
  disableNormalPass = false,
  depthBuffer,
  stencilBuffer,
  scene,
  camera,
  resolutionScale,
} = defineProps<EffectComposerProps>()

const effectComposer: ShallowRef<EffectComposerImpl | null> = shallowRef(null)

const localScene = computed(() => scene || state.scene)
const localCamera = computed(() => camera || state.camera)

let downSamplingPass = null
let normalPass = null
const webGL2Available = isWebGL2Available()

provide(effectComposerInjectionKey, effectComposer)

function setNormalPass() {
  if (effectComposer.value) {
    normalPass = new NormalPass(localScene.value as Scene, localCamera.value as TresCamera)
    normalPass.enabled = false
    effectComposer.value.addPass(normalPass)
    if (resolutionScale !== undefined && webGL2Available) {
      downSamplingPass = new DepthDownsamplingPass({
        normalBuffer: normalPass.texture,
        resolutionScale: resolutionScale,
      })
      downSamplingPass.enabled = false
      effectComposer.value.addPass(downSamplingPass)
    }
  }
}

const canvas = computed(() => state.canvas?.value) // having a seperate computed makes useElementBounding work

const { width, height } = useElementBounding(canvas)

watchEffect(() => {
  if (effectComposer.value && width.value && height.value) effectComposer.value.setSize(width.value, height.value)
})

watchEffect(() => {
  if (state.renderer && localScene.value && localCamera.value) {
    effectComposer.value = new EffectComposerImpl(state.renderer, {
      depthBuffer,
      stencilBuffer,
      multisampling: multisampling > 0 && webGL2Available ? multisampling : 0,
      frameBufferType,
    })
    effectComposer.value.addPass(new RenderPass(localScene.value, localCamera.value))

    if (!disableNormalPass) {
      setNormalPass()
    }
  }
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (enabled && state.renderer && effectComposer.value && width.value && height.value) {
    const currentAutoClear = state.renderer.autoClear
    state.renderer.autoClear = autoClear
    if (stencilBuffer && !autoClear) state.renderer.clearStencil()
    effectComposer.value.render(delta)
    state.renderer.autoClear = currentAutoClear
  }
})
</script>
<template>
  <slot />
</template>
