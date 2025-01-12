<script lang="ts">
import { useLoop } from '@tresjs/core'
import type { BlendFunction } from 'postprocessing'
import { NoiseEffect } from 'postprocessing'
import { omit } from '../../util/object'
import { makePropWatchersUsingAllProps } from '../../util/prop'
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

const { onBeforeRender } = useLoop()
onBeforeRender(({ invalidate }) => invalidate())

makePropWatchersUsingAllProps(
  omit(props, ['blendFunction']),
  effect,
  () => new NoiseEffect(),
)
</script>
