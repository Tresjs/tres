<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { ChromaticAberrationEffect } from 'postprocessing'
import { Vector2 } from 'three'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface ChromaticAberrationPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The color offset.
   */
  offset?: Vector2

  /**
   * Whether the effect should be modulated with a radial gradient.
   */
  radialModulation?: boolean

  /**
   * The modulation offset, applicable if radial modulation is enabled.
   */
  modulationOffset?: number
}

const props = withDefaults(
  defineProps<ChromaticAberrationPmndrsProps>(),
  {
    offset: () => new Vector2(0.01, 0.01),
    radialModulation: false,
    modulationOffset: 0.15,
  },
)

const { pass, effect } = useEffectPmndrs(() => new ChromaticAberrationEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.offset, 'offset'],
    [() => props.radialModulation, 'radialModulation'],
    [() => props.modulationOffset, 'modulationOffset'],
  ],
  effect,
  () => new ChromaticAberrationEffect(),
)
</script>
