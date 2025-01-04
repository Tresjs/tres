<script lang="ts" setup>
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

const props = withDefaults(
  defineProps<ScanlinePmndrsProps>(),
  {
    density: 1.25,
    opacity: 1.0,
    scrollSpeed: 0.0,
  },
)

const { pass, effect } = useEffectPmndrs(() => new ScanlineEffect(props), props)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.opacity, 'blendMode.opacity.value'],
    [() => props.density, 'density'],
    [() => props.scrollSpeed, 'scrollSpeed'],
  ],
  effect,
  () => new ScanlineEffect(),
)
</script>
