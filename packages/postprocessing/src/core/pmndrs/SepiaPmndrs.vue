<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { SepiaEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface SepiaPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The intensity of the sepia effect.
   */
  intensity?: number
}

const props = defineProps<SepiaPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new SepiaEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.intensity, 'intensity'],
  ],
  effect,
  () => new SepiaEffect(),
)
</script>
