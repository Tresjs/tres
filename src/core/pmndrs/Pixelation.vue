<script lang="ts" setup>
import { PixelationEffect } from 'postprocessing'
import { makePropWatchersUsingAllProps } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface PixelationProps {
  /**
   * The pixel granularity.
   */
  granularity?: number
}

const props = defineProps<PixelationProps>()

const { pass, effect } = useEffect(() => new PixelationEffect(props.granularity), props)
defineExpose({ pass, effect })

makePropWatchersUsingAllProps(
  props,
  effect,
  () => new PixelationEffect(),
)
</script>
