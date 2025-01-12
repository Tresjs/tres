<script lang="ts" setup>
import type { BlendFunction, KernelSize } from 'postprocessing'
import { TiltShiftEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface TiltShiftPmndrsProps {
  /**
   * The blend function. Defines how the effect blends with the original scene.
   */
  blendFunction?: BlendFunction

  /**
   * The relative offset of the focus area.
   * Range: [-0.5, 0.5]
   */
  offset?: number

  /**
   * The rotation of the focus area in radians.
   * Range: [-π, π]
   */
  rotation?: number

  /**
   * The relative size of the focus area.
   * Range: [0, 1]
   */
  focusArea?: number

  /**
   * The softness of the focus area edges.
   * Range: [0, 1]
   */
  feather?: number

  /**
   * The blur kernel size.
   */
  kernelSize?: KernelSize

  /**
   * The resolution scale.
   * Range: [0.1, 1]
   */
  resolutionScale?: number

  /**
   * The horizontal resolution.
   */
  resolutionX?: number

  /**
   * The vertical resolution.
   */
  resolutionY?: number
}

const props = defineProps<TiltShiftPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new TiltShiftEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.offset, 'offset'],
    [() => props.rotation, 'rotation'],
    [() => props.focusArea, 'focusArea'],
    [() => props.feather, 'feather'],
    [() => props.kernelSize, 'kernelSize'],
    [() => props.resolutionScale, 'resolution.scale'],
    [() => props.resolutionX, 'resolution.width'],
    [() => props.resolutionY, 'resolution.height'],
  ],
  effect,
  () => new TiltShiftEffect(),
)
</script>
