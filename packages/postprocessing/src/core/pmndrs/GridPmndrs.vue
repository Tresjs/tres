<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { GridEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface GridPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The scale.
   */
  scale?: number

  /**
   * The line width.
   */
  lineWidth?: number
}

const props = defineProps<GridPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new GridEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.scale, 'scale'],
    [() => props.lineWidth, 'lineWidth'],
  ],
  effect,
  () => new GridEffect(),
)
</script>
