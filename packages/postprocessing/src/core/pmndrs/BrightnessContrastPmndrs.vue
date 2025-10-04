<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { BrightnessContrastEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface BrightnessContrastPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The brightness of the effect.
   */
  brightness?: number

  /**
   * The contrast of the effect.
   */
  contrast?: number
}

const props = defineProps<BrightnessContrastPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new BrightnessContrastEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.brightness, 'brightness'],
    [() => props.contrast, 'contrast'],
  ],
  effect,
  () => new BrightnessContrastEffect(),
)
</script>
