<script setup lang="ts">
import type { BlendFunction } from 'postprocessing'
import { GlitchMode, EffectPass, GlitchEffect } from 'postprocessing'
import { inject, onUnmounted, shallowRef, toRaw, unref, watch, watchEffect } from 'vue'

import type { Vector2, Texture } from 'three'

import { useTresContext } from '@tresjs/core'
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
  perturbationMap?: Texture
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

const props = defineProps<GlitchProps>()

const composer = inject(effectComposerInjectionKey)
const pass = shallowRef<EffectPass | null>(null)
const effect = shallowRef<GlitchEffect | null>(null)

defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

const { camera } = useTresContext()

const unwatch = watchEffect(() => {
  if (!camera.value || !composer?.value) return

  unwatch?.()
  if (effect.value) return

  effect.value = new GlitchEffect(props)
  pass.value = new EffectPass(camera.value, effect.value)

  composer.value.addPass(pass.value)
})

watchEffect(() => {
  if (!effect.value) return
  const plainEffectPass = new GlitchEffect()

  // blendFunction and dtSize are not updated, because it has no setter in BloomEffect

  const getMode = () => {
    if (props.mode !== undefined) return props.active === false ? GlitchMode.DISABLED : props.mode

    return plainEffectPass.mode
  }

  effect.value.mode = getMode()
  effect.value.ratio = props.ratio !== undefined ? props.ratio : plainEffectPass.ratio
  effect.value.delay = props.delay !== undefined ? props.delay : plainEffectPass.delay
  effect.value.columns = props.columns !== undefined ? props.columns : plainEffectPass.columns
  effect.value.duration = props.duration !== undefined ? props.duration : plainEffectPass.duration
  effect.value.strength = props.strength !== undefined ? props.strength : plainEffectPass.strength
  effect.value.perturbationMap
    = props.perturbationMap !== undefined ? props.perturbationMap : plainEffectPass.perturbationMap
  effect.value.chromaticAberrationOffset
    = props.chromaticAberrationOffset !== undefined
      ? props.chromaticAberrationOffset
      : plainEffectPass.chromaticAberrationOffset
})

onUnmounted(() => {
  if (pass.value) composer?.value?.removePass(pass.value)
  effect.value?.dispose()
  pass.value?.dispose()
})
</script>

<template></template>
