<script lang="ts">
import type { BlendFunction, KernelSize } from 'postprocessing'
import { BloomEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface BloomPmndrsProps {
  /**
   * The blend function of this effect. This prop is not reactive.
   * @default BlendFunction.SCREEN
   * @type {BlendFunction}
   * @memberof BloomPmndrsProps
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
   * @memberof BloomPmndrsProps
   */
  kernelSize?: KernelSize
  /**
   * The luminance threshold. Raise this value to mask out darker elements in the scene. Range is [0, 1].
   *
   * @default 0.9
   *
   * @type {number}
   * @memberof BloomPmndrsProps
   */
  luminanceThreshold?: number
  /**
   * Controls the smoothness of the luminance threshold. Range is [0, 1].
   *
   * @default 0.025
   *
   * @type {number}
   * @memberof BloomPmndrsProps
   */
  luminanceSmoothing?: number
  /**
   * Enables mip map blur.
   *
   * @default false
   *
   * @type {boolean}
   * @memberof BloomPmndrsProps
   */
  mipmapBlur?: boolean
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<BloomPmndrsProps>(),
  {
    mipmapBlur: undefined,
  },
)

const { pass, effect } = useEffectPmndrs(() => new BloomEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    // blendFunction is not updated, because it has no setter in BloomEffect
    [() => props.intensity, 'intensity'],
    [() => props.kernelSize, 'kernelSize'],
    [() => props.luminanceSmoothing, 'luminanceMaterial.smoothing'],
    [() => props.luminanceThreshold, 'luminanceMaterial.threshold'],
  ],
  effect,
  () => new BloomEffect(),
)
</script>
