<script lang="ts">
import { useLoop, useTres } from '@tresjs/core'
import type { BlendFunction } from 'postprocessing'
import { NoiseEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface NoisePmndrsProps {
  /**
   * Whether the noise should be multiplied with the input color.
   */
  premultiply?: boolean
  blendFunction?: BlendFunction
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<NoisePmndrsProps>(), {
  premultiply: undefined,
})

const { pass, effect } = useEffectPmndrs(() => new NoiseEffect(props), props)
defineExpose({ pass, effect })

const { invalidate } = useTres()

const { onBeforeRender } = useLoop()
onBeforeRender(() => invalidate())

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.premultiply, 'premultiply'],
  ],
  effect,
  () => new NoiseEffect(),
)
</script>
