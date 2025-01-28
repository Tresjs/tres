<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { KuwaharaEffect } from './custom/kuwahara/index'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface KuwaharaPmndrsProps {
  /**
   * The blend function for the effect.
   * Determines how this effect blends with other effects.
   */
  blendFunction?: BlendFunction

  /**
   * The intensity of the barrel distortion.
   * A value between 0 (no distortion) and 1 (maximum distortion).
   */
  radius?: number

  /**
   * The number of sectors.
   * Determines the number of angular divisions used in the Kuwahara filter.
   * Higher values can improve the quality of the effect but may reduce performance.
   * The maximum value is defined by MAX_SECTOR_COUNT = 8 in the kuwahara/index.ts file.
   * It is preferable that the value is an integer.
   */
  sectorCount?: number
}

const props = defineProps<KuwaharaPmndrsProps>()

const { pass, effect } = useEffectPmndrs(
  () => new KuwaharaEffect(props),
  props,
)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.radius, 'radius'],
    [() => props.sectorCount, 'sectorCount'],
  ],
  effect,
  () => new KuwaharaEffect(),
)
</script>
