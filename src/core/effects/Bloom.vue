<script setup lang="ts">
import { inject, onUnmounted, ref, toRaw, unref } from 'vue'
import { BlurPass, KernelSize, EffectPass, BloomEffect, BlendFunction } from 'postprocessing'
import { useCore } from '../useCore'
import { watch } from 'vue'
import { effectComposerInjectionKey } from '../injectionKeys'

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

const composer = inject(effectComposerInjectionKey)
const pass = ref<EffectPass | null>(null)
const effect = ref<BloomEffect | null>(null)

defineExpose({ pass, effect })

function createPass() {
  effect.value = new BloomEffect({
    blendFunction,
    mipmapBlur,
    intensity,
    luminanceThreshold,
    luminanceSmoothing,
  })
  pass.value = new EffectPass(unref(state.camera), toRaw(effect.value) as BloomEffect)
}

function disposePass() {
  effect.value?.dispose()
  pass.value?.dispose()
  composer?.value?.removePass(toRaw(pass.value) as EffectPass)
}

const unwatchComposer = watch(
  () => [state.camera, composer?.value],
  () => {
    if (state.camera && composer && composer.value) {
      createPass()
      composer?.value?.addPass(toRaw(pass.value) as EffectPass)
    }
  },
)

const unwatchProps = watch(
  () => [blendFunction, mipmapBlur, intensity, luminanceThreshold, luminanceSmoothing],
  () => {
    if (pass.value) {
      disposePass()
      createPass()
      composer?.value?.addPass(toRaw(pass.value) as EffectPass)
    }
  },
)

onUnmounted(() => {
  disposePass()
  unwatchComposer()
  unwatchProps()
})
</script>
<template></template>
