<script lang="ts" setup>
import { PixelationEffect } from 'postprocessing'
import { useEffect } from '../composables/effect'
import { makePropWatchersUsingAllProps } from '../../util/prop'

export interface PixelationProps {
  /**
   * The pixel granularity.
   */
  granularity?: number
}

const props = defineProps<PixelationProps>()

const { pass, effect } = useEffect(() => new PixelationEffect(props.granularity))
defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

makePropWatchersUsingAllProps(
  props,
  effect,
  () => new PixelationEffect(),
)
</script>
