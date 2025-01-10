<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { DotScreenEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface DotScreenPmndrsProps {
  /**
   * The angle of the dot pattern.
   * Default: 1.57
   */
  angle?: number

  /**
   * The scale of the dot pattern.
   * Default: 1.0
   */
  scale?: number

  /**
   * The blend function. Defines how the effect blends with the original scene.
   */
  blendFunction?: BlendFunction
}

const props = defineProps<DotScreenPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new DotScreenEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.angle, 'angle'],
    [() => props.scale, 'scale'],
  ],
  effect,
  () => new DotScreenEffect(),
)
</script>
