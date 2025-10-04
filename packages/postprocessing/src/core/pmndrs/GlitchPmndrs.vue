<script lang="ts">
import type { BlendFunction } from 'postprocessing'
import type { Texture, Vector2 } from 'three'
import { useLoop, useTres } from '@tresjs/core'
import { GlitchEffect, GlitchMode } from 'postprocessing'
import { watchEffect } from 'vue'
import { omit } from '../../util/object'
import { makePropWatcher, makePropWatchersUsingAllProps } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface GlitchPmndrsProps {
  blendFunction?: BlendFunction
  /**
   *  The minimum and maximum delay between glitch activations in seconds.
   */
  delay?: Vector2
  /**
   * The minimum and maximum duration of a glitch in seconds.
   */
  duration?: Vector2
  /**
   * The strength of weak and strong glitches.
   */
  strength?: Vector2
  /**
   * The glitch mode. Can be DISABLED | SPORADIC | CONSTANT_MILD | CONSTANT_WILD.
   */
  mode?: GlitchMode
  /**
   * Turn the effect on and off.
   */
  active?: boolean
  /**
   *
   * The threshold for strong glitches.
   */
  ratio?: number
  /**
   * The scale of the blocky glitch columns.
   */
  columns?: number
  /**
   * A chromatic aberration offset. If provided, the glitch effect will influence this offset.
   */
  chromaticAberrationOffset?: Vector2
  /**
   * A perturbation map. If none is provided, a noise texture will be created.
   */
  perturbationMap?: Texture
  /**
   * The size of the generated noise map. Will be ignored if a perturbation map is provided.
   */
  dtSize?: number
}
</script>

<script setup lang="ts">
const props = defineProps<GlitchPmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new GlitchEffect(props), props, ['dtSize'])
defineExpose({ pass, effect })

const { invalidate } = useTres()

const { onBeforeRender } = useLoop()
onBeforeRender(() => invalidate())

watchEffect(() => {
  const getMode = () => {
    if (props.mode !== undefined) { return props.active === false ? GlitchMode.DISABLED : props.mode }
    const plainEffectPass = new GlitchEffect()

    const defaultMode = plainEffectPass.mode
    plainEffectPass.dispose()

    return defaultMode
  }

  if (effect.value) { effect.value.mode = getMode() }
})

makePropWatcher(
  () => props.blendFunction,
  effect,
  'blendMode.blendFunction',
  () => new GlitchEffect(),
)

makePropWatchersUsingAllProps(
  omit(props, ['active', 'blendFunction']),
  effect,
  () => new GlitchEffect(),
)
</script>
