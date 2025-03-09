<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { ColorDepthEffect } from 'postprocessing'
import { makePropWatcher } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { watch } from 'vue'

export interface ColorDepthPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The color bit depth.
   */
  bits?: number

  /**
   * The opacity of the effect.
   */
  opacity?: number
}

const props = defineProps<ColorDepthPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new ColorDepthEffect(props), props)

defineExpose({ pass, effect })

makePropWatcher(
  () => props.blendFunction,
  effect,
  'blendMode.blendFunction',
  () => new ColorDepthEffect(),
)
watch(
  [effect, () => props.bits],
  () => {
    if (!effect.value) { return }

    if (props.bits !== undefined) {
      effect.value?.setBitDepth(props.bits)
    }
    else {
      const plainEffect = new ColorDepthEffect()
      effect.value?.setBitDepth(plainEffect.getBitDepth())
      plainEffect.dispose()
    }
  },
)

watch(
  [effect, () => props.opacity],
  () => {
    if (!effect.value) { return }

    if (props.opacity !== undefined) {
      effect.value?.blendMode.setOpacity(props.opacity)
    }
    else {
      const plainEffect = new ColorDepthEffect()
      effect.value?.blendMode.setOpacity(plainEffect.blendMode.getOpacity())
      plainEffect.dispose()
    }
  },
)
</script>
