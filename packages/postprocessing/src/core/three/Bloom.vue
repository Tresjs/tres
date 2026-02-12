<script lang="ts">
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'
import { makePropWatchers } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface BloomProps {
  /**
   * The bloom strength. Controls the intensity of the bloom effect.
   * @default 1
   */
  strength?: number
  /**
   * The kernel size for the convolution blur. Determines the spread of the bloom effect.
   * This property cannot be changed after instantiation without recreating the pass.
   * @default 25
   */
  kernelSize?: number
  /**
   * The sigma value for the Gaussian blur kernel. Controls the blur smoothness.
   * This property cannot be changed after instantiation without recreating the pass.
   * @default 4
   */
  sigma?: number
  /**
   * If set to true, the pass is processed by the composer.
   * @default true
   */
  enabled?: boolean
}
</script>

<script lang="ts" setup>
const props = defineProps<BloomProps>()

const { pass } = useEffect(
  () => new BloomPass(props.strength, props.kernelSize, props.sigma),
  props,
  ['kernelSize', 'sigma'],
)

defineExpose({ pass })

makePropWatchers(
  [
    [() => props.strength, 'combineUniforms.strength.value'],
    [() => props.enabled, 'enabled'],
  ],
  pass,
  () => new BloomPass(),
)
</script>
