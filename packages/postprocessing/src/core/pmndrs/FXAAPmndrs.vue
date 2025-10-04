<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { FXAAEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { watch } from 'vue'

export interface FXAAPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction
  /**
   * The opacity of the effect.
   */
  opacity?: number
  /**
   * The maximum amount of edge detection samples.
   */
  samples?: number
  /**
   * The minimum edge detection threshold. Range is [0.0, 1.0].
   */
  minEdgeThreshold?: number
  /**
   * The maximum edge detection threshold. Range is [0.0, 1.0].
   */
  maxEdgeThreshold?: number
  /**
   * The subpixel blend quality. Range is [0.0, 1.0].
   */
  subpixelQuality?: number
}

const props = defineProps<FXAAPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new FXAAEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.samples, 'samples'],
    [() => props.minEdgeThreshold, 'minEdgeThreshold'],
    [() => props.maxEdgeThreshold, 'maxEdgeThreshold'],
    [() => props.subpixelQuality, 'subpixelQuality'],
  ],
  effect,
  () => new FXAAEffect(),
)

watch(
  [effect, () => props.opacity],
  () => {
    if (!effect.value) { return }

    if (props.opacity !== undefined) {
      effect.value?.blendMode.setOpacity(props.opacity)
    }
    else {
      const plainEffect = new FXAAEffect()
      effect.value?.blendMode.setOpacity(plainEffect.blendMode.getOpacity())
      plainEffect.dispose()
    }
  },
  { immediate: true },
)
</script>
