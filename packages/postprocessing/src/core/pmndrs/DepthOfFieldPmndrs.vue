<script lang="ts">
import type { BlendFunction } from 'postprocessing'
import { useTres } from '@tresjs/core'
import { DepthOfFieldEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface DepthOfFieldPmndrsProps {
  /**
   * The blend function of this effect.
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
</script>

<script lang="ts" setup>
const props = defineProps<DepthOfFieldPmndrsProps>()
const { camera } = useTres()

const { pass, effect } = useEffectPmndrs(() => new DepthOfFieldEffect(camera.value, props), props)
defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.worldFocusDistance, 'circleOfConfusionMaterial.worldFocusDistance'],
    [() => props.focusDistance, 'circleOfConfusionMaterial.focusDistance'],
    [() => props.worldFocusRange, 'circleOfConfusionMaterial.worldFocusRange'],
    [() => props.focusRange, 'circleOfConfusionMaterial.focusRange'],
    [() => props.bokehScale, 'bokehScale'],
    [() => props.resolutionScale, 'blurPass.resolution.scale'],
    [() => props.resolutionX, 'resolution.width'],
    [() => props.resolutionY, 'resolution.height'],
  ],
  effect,
  () => new DepthOfFieldEffect(),
)
</script>
