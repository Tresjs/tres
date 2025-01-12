<script lang="ts" setup>
import { LensDistortionEffect } from 'postprocessing'
import { makePropWatchersUsingAllProps } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { Vector2 } from 'three'

export interface LensDistortionPmndrsProps {
  /**
   * The distortion effect strength.
   */
  distortion?: Vector2 | [number, number]

  /**
   * The center point.
   */
  principalPoint?: Vector2 | [number, number]

  /**
   * The focal length.
   */
  focalLength?: Vector2 | [number, number]

  /**
   * The skew value.
   */
  skew?: number
}

const props = defineProps<LensDistortionPmndrsProps>()

const { pass, effect } = useEffectPmndrs(
  () => new LensDistortionEffect({
    ...props,
    distortion: props.distortion ? (Array.isArray(props.distortion) ? new Vector2(...props.distortion) : props.distortion) : new Vector2(),
    principalPoint: props.principalPoint ? (Array.isArray(props.principalPoint) ? new Vector2(...props.principalPoint) : props.principalPoint) : new Vector2(),
    focalLength: props.focalLength ? (Array.isArray(props.focalLength) ? new Vector2(...props.focalLength) : props.focalLength) : new Vector2(),
  }),
  props,
)

defineExpose({ pass, effect })

makePropWatchersUsingAllProps(
  props,
  effect,
  () => new LensDistortionEffect(),
)
</script>
