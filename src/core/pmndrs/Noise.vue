<script lang="ts" setup>
import { useLoop } from '@tresjs/core'
import { BlendFunction, NoiseEffect } from 'postprocessing'
import { omit } from '../../util/object'
import { makePropWatchersUsingAllProps } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface NoiseProps {
  /**
   * Whether the noise should be multiplied with the input color.
   */
  premultiply?: boolean
  blendFunction?: BlendFunction
}

const props = withDefaults(defineProps<NoiseProps>(), {
  premultiply: false,
  blendFunction: BlendFunction.SCREEN,
})

const { pass, effect } = useEffect(() => new NoiseEffect(props), props)
defineExpose({ pass, effect })

const { onBeforeRender } = useLoop()
onBeforeRender(({ invalidate }) => invalidate())

makePropWatchersUsingAllProps(
  omit(props, ['blendFunction']),
  effect,
  () => new NoiseEffect(),
)
</script>
