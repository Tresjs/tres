<script lang="ts" setup>
import { watch } from 'vue'
import type { BlendFunction } from 'postprocessing'
import { ScanlineEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface ScanlinePmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction

  /**
   * The density of the scanlines.
   */
  density?: number

  /**
   * The density of the scanlines.
   */
  scrollSpeed?: number

  /**
   * The opacity of the scanlines.
   */
  opacity?: number
}

const props = defineProps<ScanlinePmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new ScanlineEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.density, 'density'],
    [() => props.scrollSpeed, 'scrollSpeed'],
  ],
  effect,
  () => new ScanlineEffect(),
)

watch(
  [() => props.opacity],
  () => {
    if (props.opacity !== undefined) {
      effect.value?.blendMode.setOpacity(props.opacity)
    }
    else {
      const plainEffect = new ScanlineEffect()
      effect.value?.blendMode.setOpacity(plainEffect.blendMode.getOpacity())
      plainEffect.dispose()
    }
  },
  {
    immediate: true,
  },
)
</script>
