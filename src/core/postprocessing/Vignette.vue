<script lang="ts" setup>
import { BlendFunction, VignetteEffect, VignetteTechnique } from 'postprocessing'
import { omit } from '../../util/object'
import { makePropWatchersUsingAllProps } from '../../util/prop'
import { useEffect } from './composables/useEffect'

export interface VignetteProps {
  /**
   * Whether the noise should be multiplied with the input color.
   */
  technique?: VignetteTechnique
  blendFunction?: BlendFunction
  offset: number
  darkness: number
}

const props = withDefaults(defineProps<VignetteProps>(), {
  technique: VignetteTechnique.DEFAULT,
  blendFunction: BlendFunction.NORMAL,
  offset: 0.5,
  darkness: 0.5,
})

const { pass, effect } = useEffect(() => new VignetteEffect(props))
defineExpose({ pass, effect })

makePropWatchersUsingAllProps(
  omit(props, ['blendFunction']),
  effect,
  () => new VignetteEffect(),
)
</script>
