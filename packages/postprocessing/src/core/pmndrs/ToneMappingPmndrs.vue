<script lang="ts" setup>
import type { BlendFunction, ToneMappingMode } from 'postprocessing'
import { ToneMappingEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface ToneMappingPmndrsProps {
  /**
   * The tone mapping mode.
   */
  mode?: ToneMappingMode

  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The resolution for luminance texture. The resolution of the luminance texture. Must be a power of two.
   */
  resolution?: number

  /**
   * The average luminance. Only for `REINHARD2`.
   */
  averageLuminance?: number

  /**
   * The middle grey factor. Only for `REINHARD2`.
   */
  middleGrey?: number

  /**
   * The minimum luminance. Only for `REINHARD2`.
   */
  minLuminance?: number

  /**
   * The white point. Only for `REINHARD2`.
   */
  whitePoint?: number
}

const props = defineProps<ToneMappingPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new ToneMappingEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.mode, 'mode'],
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.resolution, 'resolution'],
    [() => props.averageLuminance, 'averageLuminance'],
    [() => props.middleGrey, 'middleGrey'],
    [() => props.minLuminance, 'adaptiveLuminanceMaterial.minLuminance'],
    [() => props.whitePoint, 'whitePoint'],
  ],
  effect,
  () => new ToneMappingEffect(),
)
</script>
