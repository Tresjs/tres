<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { h, inject, onUnmounted, shallowRef, watchEffect } from 'vue'
import type { KernelSize, BlendFunction } from 'postprocessing'
import { EffectPass, BloomEffect } from 'postprocessing'
import { effectComposerInjectionKey } from '../injectionKeys'

export interface BloomProps {
  /**
   * The blend function of this effect. This prop is not reactive.
   * @default BlendFunction.SCREEN
   * @type {BlendFunction}
   * @memberof BloomProps
  */
  blendFunction?: BlendFunction
  /**
   * The intensity of the bloom effect.
   *
   * @default 1
   * @type {number}
   * @memberof BloomProps
   */
  intensity?: number
  /**
   * The kernel size.
   *
   * @default KernelSize.LARGE
   *
   * @type {KernelSize}
   * @memberof BloomProps
   */
  kernelSize?: KernelSize
  /**
   * The luminance threshold. Raise this value to mask out darker elements in the scene. Range is [0, 1].
   *
   * @default 0.9
   *
   * @type {number}
   * @memberof BloomProps
   */
  luminanceThreshold?: number
  /**
   * Controls the smoothness of the luminance threshold. Range is [0, 1].
   *
   * @default 0.025
   *
   * @type {number}
   * @memberof BloomProps
   */
  luminanceSmoothing?: number
  /**
   * Enables mip map blur.
   *
   * @default false
   *
   * @type {boolean}
   * @memberof BloomProps
   */
  mipmapBlur?: boolean
}

const props = defineProps<BloomProps>()

const composer = inject(effectComposerInjectionKey)
const pass = shallowRef<EffectPass | null>(null)
const effect = shallowRef<BloomEffect | null>(null)

defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

const { camera } = useTresContext()

const unwatch = watchEffect(() => {
  if (!camera.value || !composer?.value) return

  unwatch?.()
  if (effect.value) return

  effect.value = new BloomEffect(props)
  pass.value = new EffectPass(camera.value, effect.value)

  composer.value.addPass(pass.value)
})

watchEffect(() => {
  if (!effect.value) return
  const plainEffectPass = new BloomEffect()

  // blendFunction is not updated, because it has no setter in BloomEffect

  effect.value.intensity = props.intensity !== undefined ? props.intensity : plainEffectPass.intensity
  effect.value.kernelSize = props.kernelSize !== undefined ? props.kernelSize : plainEffectPass.kernelSize
  effect.value.luminanceMaterial.smoothing
    = props.luminanceSmoothing !== undefined ? props.luminanceSmoothing : plainEffectPass.luminanceMaterial.smoothing
  effect.value.luminanceMaterial.threshold
    = props.luminanceThreshold !== undefined ? props.luminanceThreshold : plainEffectPass.luminanceMaterial.threshold

  plainEffectPass.dispose()
})

onUnmounted(() => {
  if (pass.value) composer?.value?.removePass(pass.value)
  effect.value?.dispose()
  pass.value?.dispose()
})
</script>

<template></template>
