<script lang="ts" setup>
import type { BlendFunction, KernelSize } from 'postprocessing'
import { GodRaysEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { useTresContext } from '@tresjs/core'
import { toRaw, watch } from 'vue'
import type { Mesh, Points } from 'three'

export interface GodRaysPmndrsProps {
  /**
   * The blend function of this effect.
   */
  blendFunction?: BlendFunction

  /**
   * The light source. Must not write depth and has to be flagged as transparent.
   */
  lightSource?: Mesh | Points

  /**
   * The opacity of the God Rays.
   */
  opacity?: number

  /**
   * The density of the light rays.
   */
  density?: number

  /**
   * The decay of the light rays.
   */
  decay?: number

  /**
   * The blur kernel size. Has no effect if blur is disabled.
   */
  kernelSize?: KernelSize

  /**
   * The resolution scale.
   */
  resolutionScale?: number

  /**
   * Whether the god rays should be blurred to reduce artifacts.
   */
  blur?: boolean

  /**
   * The horizontal resolution.
   */
  resolutionX?: number

  /**
   * The vertical resolution.
   */
  resolutionY?: number

  /**
   * The weight of the light rays.
   */
  weight?: number

  /**
   * A constant attenuation coefficient.
   */
  exposure?: number

  /**
   * The number of samples per pixel.
   */
  samples?: number

  /**
   * An upper bound for the saturation of the overall effect.
   */
  clampMax?: number
}

const props = defineProps<GodRaysPmndrsProps>()

const { camera } = useTresContext()

const { pass, effect } = useEffectPmndrs(
  () => new GodRaysEffect(camera.value, toRaw(props.lightSource), props),
  props,
)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.density, 'godRaysMaterial.density'],
    [() => props.decay, 'godRaysMaterial.decay'],
    [() => props.weight, 'godRaysMaterial.weight'],
    [() => props.exposure, 'godRaysMaterial.exposure'],
    [() => props.samples, 'godRaysMaterial.samples'],
    [() => props.clampMax, 'godRaysMaterial.maxIntensity'],
    [() => props.resolutionScale, 'resolution.scale'],
    [() => props.resolutionX, 'resolution.width'],
    [() => props.resolutionY, 'resolution.height'],
    [() => props.kernelSize, 'kernelSize'],
    [() => props.blur, 'blur'],
  ],
  effect,
  () => new GodRaysEffect(),
)

watch(
  [() => props.opacity],
  () => {
    if (props.opacity !== undefined) {
      effect.value?.blendMode.setOpacity(props.opacity)
    }
    else {
      const plainEffect = new GodRaysEffect(camera.value, toRaw(props.lightSource))
      effect.value?.blendMode.setOpacity(plainEffect.blendMode.getOpacity())
      plainEffect.dispose()
    }
  },
  {
    immediate: true,
  },
)
</script>
