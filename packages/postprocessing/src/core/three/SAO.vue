<script lang="ts">
import { useTresContext } from '@tresjs/core'
import { Vector2 } from 'three'
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js'
import { makePropWatchers } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface SAOProps {
  /**
   * If set to true, the pass is processed by the composer.
   * @default true
   */
  enabled?: boolean
  /**
   * If set to true, the pass indicates to swap read and write buffer after rendering.
   * @default false
   */
  needsSwap?: boolean
  /**
   * If set to true, the pass clears its buffer before rendering.
   * @default true
   */
  clear?: boolean
  /**
   * If set to true, the result of the pass is rendered to screen.
   * @default false
   */
  renderToScreen?: boolean
  /**
   * Controls the output visualization mode.
   * 0 = Default (AO composited on scene), 1 = SAO (raw AO texture), 2 = Normal (normal buffer).
   */
  output?: number
  /**
   * Bias for the ambient occlusion calculation. Higher values reduce self-occlusion artifacts.
   */
  saoBias?: number
  /**
   * Intensity of the ambient occlusion effect.
   */
  saoIntensity?: number
  /**
   * Scale factor for the ambient occlusion distance-dependent falloff.
   */
  saoScale?: number
  /**
   * The radius of the AO sampling kernel in world-space units.
   */
  saoKernelRadius?: number
  /**
   * Minimum resolution threshold for AO samples.
   */
  saoMinResolution?: number
  /**
   * Whether to apply a depth-limited blur to reduce noise.
   */
  saoBlur?: boolean
  /**
   * Kernel radius for the depth-limited Gaussian blur.
   */
  saoBlurRadius?: number
  /**
   * Standard deviation of the Gaussian blur kernel.
   */
  saoBlurStdDev?: number
  /**
   * Depth cutoff factor for the blur to prevent blurring across edges.
   */
  saoBlurDepthCutoff?: number
}
</script>

<script lang="ts" setup>
const props = defineProps<SAOProps>()

const { scene, camera, sizes } = useTresContext()

const { pass } = useEffect(
  () => new SAOPass(
    scene.value,
    camera.activeCamera.value,
    new Vector2(sizes.width.value, sizes.height.value),
  ),
  props,
)

defineExpose({ pass })

makePropWatchers(
  [
    [() => props.enabled, 'enabled'],
    [() => props.needsSwap, 'needsSwap'],
    [() => props.clear, 'clear'],
    [() => props.renderToScreen, 'renderToScreen'],
    [() => props.output, 'params.output'],
    [() => props.saoBias, 'params.saoBias'],
    [() => props.saoIntensity, 'params.saoIntensity'],
    [() => props.saoScale, 'params.saoScale'],
    [() => props.saoKernelRadius, 'params.saoKernelRadius'],
    [() => props.saoMinResolution, 'params.saoMinResolution'],
    [() => props.saoBlur, 'params.saoBlur'],
    [() => props.saoBlurRadius, 'params.saoBlurRadius'],
    [() => props.saoBlurStdDev, 'params.saoBlurStdDev'],
    [() => props.saoBlurDepthCutoff, 'params.saoBlurDepthCutoff'],
  ],
  pass,
  () => new SAOPass(scene.value, camera.activeCamera.value),
)
</script>
