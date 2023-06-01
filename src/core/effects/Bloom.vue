<script setup lang="ts">
import { Ref, defineComponent, inject, ref, toRaw, toRefs, unref, watchEffect } from 'vue'
import { BlurPass, KernelSize, EffectPass, BloomEffect, EffectComposer, BlendFunction } from 'postprocessing'
import { useCore } from '../useCore'
import { watch } from 'vue'

export type BloomProps = {
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
   *  An efficient, incremental blur pass.
   *
   * @type {BlurPass}
   * @memberof BloomProps
   */
  blurPass?: BlurPass
  /**
   * The width of the render
   *
   * @type {number}
   * @memberof BloomProps
   */
  width?: number
  /**
   * The height of the render
   *
   * @type {number}
   * @memberof BloomProps
   */
  height?: number
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

const {
  blendFunction = BlendFunction.ADD,
  mipmapBlur = false,
  intensity = 1,
  luminanceThreshold = 0.9,
  luminanceSmoothing = 0.025,
} = defineProps<BloomProps>()

const { state } = useCore()

const composer = inject<Ref<EffectComposer>>('effectComposer')
const pass = ref<EffectPass | null>(null)

defineExpose({ pass })

watch(
  () => [state.camera, composer?.value],
  () => {
    if (state.camera && composer && composer.value) {
      pass.value = new EffectPass(
        unref(state.camera),
        new BloomEffect({
          blendFunction,
          mipmapBlur,
          intensity,
          luminanceThreshold,
          luminanceSmoothing,
        }),
      )
      composer?.value?.addPass(toRaw(pass.value) as EffectPass)
    }
  },
)

watch(
  () => [blendFunction.value, mipmapBlur.value, intensity.value, luminanceThreshold.value, luminanceSmoothing.value],
  () => {
    if (pass.value) {
      composer?.value.removePass(toRaw(pass.value) as EffectPass)
      pass.value = new EffectPass(
        unref(state.camera),
        new BloomEffect({
          blendFunction,
          mipmapBlur,
          intensity,
          luminanceThreshold,
          luminanceSmoothing,
        }),
      )
      composer?.value?.addPass(toRaw(pass.value) as EffectPass)
    }
  },
)
</script>
<template></template>
