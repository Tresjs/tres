<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { useTresContext } from '@tresjs/core'
import { DepthOfFieldEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffect } from '../composables/effect'

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
const { camera } = useTresContext()
  
const { pass, effect } = useEffect(() => new DepthOfFieldEffect(camera.value, props))
defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

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
</script>

<template></template>