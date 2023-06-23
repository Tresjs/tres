<script setup lang="ts">
import { GlitchMode, EffectComposer, EffectPass, GlitchEffect, BlendFunction } from 'postprocessing'
import { Ref, inject, onUnmounted, ref, toRaw, unref, watch, watchEffect } from 'vue'

import { Vector2, Texture } from 'three'

import { useCore } from '../useCore'
import { effectComposerInjectionKey } from '../injectionKeys'

export interface GlitchProps {
  blendFunction?: BlendFunction
  /**
   *  The minimum and maximum delay between glitch activations in seconds.
   *
   * @default [1.5, 3.5]
   *
   * @type {Vector2}
   * @memberof GlitchProps
   */
  delay?: Vector2
  /**
   * The minimum and maximum duration of a glitch in seconds.
   *
   * @default [0.6, 1.0]
   *
   * @type {Vector2}
   * @memberof GlitchProps
   */
  duration?: Vector2
  /**
   * The strength of weak and strong glitches.
   *
   * @default [0.3, 1.0]
   *
   * @type {Vector2}
   * @memberof GlitchProps
   */
  strength?: Vector2
  /**
   * The glitch mode. Can be DISABLED | SPORADIC | CONSTANT_MILD | CONSTANT_WILD .
   *
   * @default GlitchMode.SPORADIC
   *
   * @type {GlitchMode}
   * @memberof GlitchProps
   */
  mode?: GlitchMode
  /**
   * Turn the effect on and off.
   *
   * @type {boolean}
   * @memberof GlitchProps
   */
  active?: boolean
  /**
   *
   * The threshold for strong glitches.
   *
   * @default 0.85
   *
   * @type {number}
   * @memberof GlitchProps
   */
  ratio?: number
  /**
   * The scale of the blocky glitch columns.
   *
   * @default 0.05
   *
   * @type {number}
   * @memberof GlitchProps
   */
  columns?: number
  /**
   * A chromatic aberration offset. If provided, the glitch effect will influence this offset.
   *
   * @type {Vector2}
   * @memberof GlitchProps
   */
  chromaticAberrationOffset?: Vector2
  /**
   * A perturbation map. If none is provided, a noise texture will be created.
   *
   * @type {Texture}
   * @memberof GlitchProps
   */
  peturbationMap?: Texture
  /**
   * The size of the generated noise map. Will be ignored if a perturbation map is provided.
   *
   * @default 64
   *
   * @type {number}
   * @memberof GlitchProps
   */
  dtSize?: number
}

const {
  blendFunction = BlendFunction.ADD,
  delay,
  duration,
  strength,
  mode,
  active,
  ratio = 0.85,
  columns = 0.05,
  chromaticAberrationOffset,
  peturbationMap,
  dtSize = 64,
} = defineProps<GlitchProps>()

const { state } = useCore()

const composer = inject(effectComposerInjectionKey)
const pass = ref<EffectPass | null>(null)
const effect = ref<GlitchEffect | null>(null)

defineExpose({ pass })

function createPass() {
  effect.value = new GlitchEffect({
    blendFunction,
    delay,
    duration,
    strength,
    ratio,
    columns,
    chromaticAberrationOffset,
    dtSize,
  })
  pass.value = new EffectPass(unref(state.camera), toRaw(effect.value) as GlitchEffect)
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
  () => [delay, duration, strength, ratio, columns, chromaticAberrationOffset, peturbationMap, dtSize],
  () => {
    if (pass.value) {
      composer?.value?.removePass(toRaw(pass.value) as EffectPass)
      createPass()
      composer?.value?.addPass(toRaw(pass.value) as EffectPass)
    }
  },
)

watchEffect(() => {
  if (pass.value) {
    pass.value.mode = active ? mode || GlitchMode.SPORADIC : GlitchMode.DISABLED
  }
})

const unwatchActive = watch(
  () => active,
  value => {
    if (pass.value) {
      pass.value.enabled = value as boolean
    }
  },
)

onUnmounted(() => {
  disposePass()
  unwatchComposer()
  unwatchProps()
  unwatchActive()
})
</script>
<template></template>
