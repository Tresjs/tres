<script lang="ts" setup>
import { ChromaticAberrationEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import type { Vector2 } from 'three'
import type { BlendFunction } from 'postprocessing'

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
    radialModulation: undefined,
  },
)

const plainEffect = new ChromaticAberrationEffect()

const { pass, effect } = useEffectPmndrs(() => new ChromaticAberrationEffect({
  ...props,
  // Unfortunately, these defaults must be set this way as the type in postprocessing is not correct.
  // The arguments are optional in the actual constructor, but not in the type.
  radialModulation: props.radialModulation ?? plainEffect.radialModulation,
  modulationOffset: props.modulationOffset ?? plainEffect.modulationOffset,
}), props)

plainEffect.dispose()

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
