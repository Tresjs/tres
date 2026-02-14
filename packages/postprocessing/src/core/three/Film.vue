<script lang="ts">
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { makePropWatchers } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface FilmProps {
  /**
   * The grain intensity in the range [0,1] (0 = no effect, 1 = full effect)
   * @default 0.5
   */
  intensity?: number
  /**
   * Whether to apply a grayscale effect or not
   * @default false
   */
  grayscale?: boolean
  /**
   * If set to true, the pass is processed by the composer
   * @default true
   */
  enabled?: boolean
  /**
   * If set to true, the pass indicates to swap read and write buffer after rendering
   * @default true
   */
  needsSwap?: boolean
  /**
   * If set to true, the pass clears its buffer before rendering
   * @default false
   */
  clear?: boolean
  /**
   * If set to true, the result of the pass is rendered to screen.
   * The last pass in the composer's pass chain gets automatically rendered to screen.
   * @default false
   */
  renderToScreen?: boolean
}
</script>

<!-- TODO test this component and bloom-->
<script lang="ts" setup>
const props = defineProps<FilmProps>()

const { pass } = useEffect(() => new FilmPass(props.intensity, props.grayscale), props)

defineExpose({ pass })

makePropWatchers(
  [
    [() => props.intensity, 'uniforms.intensity.value'],
    [() => props.grayscale, 'uniforms.grayscale.value'],
    [() => props.enabled, 'enabled'],
    [() => props.needsSwap, 'needsSwap'],
    [() => props.clear, 'clear'],
    [() => props.renderToScreen, 'renderToScreen'],
  ],
  pass,
  () => new FilmPass(),
)
</script>
