<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { useTresContext } from '@tresjs/core'
import { EffectPass, DepthOfFieldEffect } from 'postprocessing'
import { inject, onUnmounted, shallowRef, watchEffect } from 'vue'
import { makePropWatchers } from '../../util/prop'
import { effectComposerInjectionKey } from '../injectionKeys'

export interface DepthOfFieldProps {
  /**
   * The blend function of this effect. This prop is not reactive.
   */
  blendFunction?: BlendFunction

  /**
   * The focus distance in world units.
   */
  worldFocusDistance?: number

  /**
   * The focus range in world units.
   */
  worldFocusRange?: number

  /**
   * The normalized focus distance. Range is [0.0, 1.0].
   */
  focusDistance?: number

  /**
   * The focus range. Range is [0.0, 1.0].
   */
  focusRange?: number

  /**
   * The scale of the bokeh blur.
   */
  bokehScale?: number

  resolutionScale?: number
  resolutionX?: number
  resolutionY?: number
}

const props = defineProps<DepthOfFieldProps>()

const composer = inject(effectComposerInjectionKey)
const pass = shallowRef<EffectPass | null>(null)
const effect = shallowRef<DepthOfFieldEffect | null>(null)

defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

const { camera } = useTresContext()

const unwatch = watchEffect(() => {
  if (!camera.value || !composer?.value) return

  unwatch?.()

  if (effect.value) return

  effect.value = new DepthOfFieldEffect(camera.value, props)
  pass.value = new EffectPass(camera.value, effect.value)

  composer?.value?.addPass(pass.value)
})

makePropWatchers(
  [
    // blendFunction is not updated, because it has no setter in BloomEffect
    [ () => props.worldFocusDistance, 'circleOfConfusionMaterial.worldFocusDistance'],
    [ () => props.focusDistance, 'circleOfConfusionMaterial.focusDistance' ],
    [ () => props.worldFocusRange, 'circleOfConfusionMaterial.worldFocusRange'],
    [ () => props.focusRange, 'circleOfConfusionMaterial.focusRange'],
    [ () => props.bokehScale, 'bokehScale'],
    [ () => props.resolutionScale, 'blurPass.resolution.scale'],
    [ () => props.resolutionX, 'resolution.width'],
    [ () => props.resolutionY, 'resolution.height'],
  ],  
  effect,
  () => new DepthOfFieldEffect(),
)

onUnmounted(() => {
  if (pass.value) composer?.value?.removePass(pass.value)
  effect.value?.dispose()
  pass.value?.dispose()
})
</script>

<template></template>