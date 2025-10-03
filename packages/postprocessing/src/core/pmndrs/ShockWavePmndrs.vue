<script lang="ts" setup>
import { ShockWaveEffect } from 'postprocessing'
import { Vector3 } from 'three'
import { watch } from 'vue'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { useTres } from '@tresjs/core'

export interface ShockWavePmndrsProps {
  /**
   * The position of the shockwave.
   */
  position?: Vector3 | [number, number, number]

  /**
   * The amplitude of the shockwave.
   */
  amplitude?: number

  /**
   * The speed of the shockwave.
   */
  speed?: number

  /**
   * The max radius of the shockwave.
   */
  maxRadius?: number

  /**
   * The wave size of the shockwave.
   */
  waveSize?: number
}

const props = defineProps<ShockWavePmndrsProps>()

const { camera } = useTres()

const { pass, effect } = useEffectPmndrs(
  () => new ShockWaveEffect(camera.value, Array.isArray(props.position) ? new Vector3(...props.position) : props.position, props),
  props,
)

defineExpose({ pass, effect })

watch(
  () => props.position,
  (newPosition) => {
    if (!effect.value) { return }

    if (Array.isArray(newPosition)) {
      effect.value.position.set(...newPosition)
    }
    else if (newPosition instanceof Vector3) {
      effect.value.position.copy(newPosition)
    }
  },
  { immediate: true },
)

makePropWatchers(
  [
    [() => props.amplitude, 'amplitude'],
    [() => props.waveSize, 'waveSize'],
    [() => props.maxRadius, 'maxRadius'],
    [() => props.speed, 'speed'],
  ],
  effect,
  () => new ShockWaveEffect(),
)
</script>
