<script lang="ts">
import { PixelationEffect } from 'postprocessing'
import { makePropWatchersUsingAllProps } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface PixelationPmndrsProps {
  /**
   * The pixel granularity.
   */
  granularity?: number
}
</script>

<script lang="ts" setup>
const props = defineProps<PixelationPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new PixelationEffect(props.granularity), props)
defineExpose({ pass, effect })

makePropWatchersUsingAllProps(
  props,
  effect,
  () => new PixelationEffect(),
)
</script>
