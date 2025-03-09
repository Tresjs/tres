<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { FishEyeEffect } from './custom/fish-eye/index'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { computed } from 'vue'

export interface FishEyePmndrsProps {
  /**
   * The blend function for the effect.
   * Determines how this effect blends with other effects.
   */
  blendFunction?: BlendFunction

  /**
   * The lens scale.
   * A Vector2 value or an array of two numbers.
   */
  lensS?: Vector2 | [number, number]

  /**
   * The lens factor.
   * A Vector2 value or an array of two numbers.
   */
  lensF?: Vector2 | [number, number]

  /**
   * The scale of the effect.
   * A number value.
   */
  scale?: number
}

const props = defineProps<FishEyePmndrsProps>()

const computedLensS = computed(() =>
  Array.isArray(props.lensS) ? new Vector2(...props.lensS) : props.lensS,
)
const computedLensF = computed(() =>
  Array.isArray(props.lensF) ? new Vector2(...props.lensF) : props.lensF,
)

const { pass, effect } = useEffectPmndrs(
  () =>
    new FishEyeEffect({
      ...props,
      lensS: computedLensS.value,
      lensF: computedLensF.value,
    }),
  props,
)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => computedLensS.value, 'lensS'],
    [() => computedLensF.value, 'lensF'],
    [() => props.scale, 'scale'],
  ],
  effect,
  () => new FishEyeEffect(),
)
</script>
