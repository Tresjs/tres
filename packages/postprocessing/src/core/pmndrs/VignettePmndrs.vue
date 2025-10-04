<script lang="ts">
import type { BlendFunction, VignetteTechnique } from 'postprocessing'
import { VignetteEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface VignettePmndrsProps {
  /**
   * Whether the noise should be multiplied with the input color.
   */
  technique?: VignetteTechnique
  blendFunction?: BlendFunction
  offset?: number
  darkness?: number
}
</script>

<script lang="ts" setup>
const props = defineProps<VignettePmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new VignetteEffect(props), props)
defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.offset, 'offset'],
    [() => props.darkness, 'darkness'],
    [() => props.technique, 'technique'],
  ],
  effect,
  () => new VignetteEffect(),
)
</script>
