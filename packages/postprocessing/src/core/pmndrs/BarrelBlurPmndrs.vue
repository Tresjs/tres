<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { BarrelBlurEffect } from './custom/barrel-blur/index'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface BarrelBlurPmndrsProps {
  /**
   * The blend function for the effect.
   * Determines how this effect blends with other effects.
   */
  blendFunction?: BlendFunction

  /**
   * The intensity of the barrel distortion.
   * A value between 0 (no distortion) and 1 (maximum distortion).
   */
  amount?: number

  /**
   * The offset of the barrel distortion center.
   * A Vector2 value or an A value or an array of two numbers, with both values ranging from 0 to 1.
   * This allows you to change the position of the distortion effect.
   */
  offset?: Vector2 | [number, number]
}

const props = defineProps<BarrelBlurPmndrsProps>()

const { pass, effect } = useEffectPmndrs(
  () => new BarrelBlurEffect({
    ...props,
    offset: Array.isArray(props.offset) ? new Vector2(...props.offset) : props.offset,
  }),
  props,
)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.amount, 'amount'],
    [() => props.offset, 'offset'],
  ],
  effect,
  () => new BarrelBlurEffect(),
)
</script>
