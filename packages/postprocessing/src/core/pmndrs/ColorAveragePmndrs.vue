<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { ColorAverageEffect } from 'postprocessing'
import { makePropWatcher } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { watch } from 'vue'

export interface ColorAveragePmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The opacity of the color Average.
   */
  opacity?: number
}

const props = defineProps<ColorAveragePmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new ColorAverageEffect(props.blendFunction), props)

defineExpose({ pass, effect })

makePropWatcher(
  () => props.blendFunction,
  effect,
  'blendMode.blendFunction',
  () => new ColorAverageEffect(),
)

watch(
  [effect, () => props.opacity],
  () => {
    if (!effect.value) { return }

    if (props.opacity !== undefined) {
      effect.value?.blendMode.setOpacity(props.opacity)
    }
    else {
      const plainEffect = new ColorAverageEffect()
      effect.value?.blendMode.setOpacity(plainEffect.blendMode.getOpacity())
      plainEffect.dispose()
    }
  },
)
</script>
