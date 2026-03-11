<script lang="ts">
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'
import { makePropWatchersUsingAllProps } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface AfterimageProps {
  /**
   * The damping intensity from 0.0 to 1.0. A higher value means a stronger after image effect.
   * @default 0.96
   */
  damp?: number
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

<script lang="ts" setup>
const props = defineProps<AfterimageProps>()

const { pass } = useEffect(() => new AfterimagePass(props.damp), props)

defineExpose({ pass })

makePropWatchersUsingAllProps(
  props,
  pass,
  () => new AfterimagePass(),
)
</script>
