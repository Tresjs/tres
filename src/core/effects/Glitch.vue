<script setup lang="ts">
import { GlitchEffect, GlitchMode } from 'postprocessing'
import { watchEffect } from 'vue'
import type { BlendFunction } from 'postprocessing'
import type { Texture, Vector2 } from 'three'
import { omit } from '../../util/object'
import { useEffect } from '../composables/effect'
import { makePropWatchersUsingAllProps } from '../../util/prop'

export interface GlitchProps {
  blendFunction?: BlendFunction
  /**
   *  The minimum and maximum delay between glitch activations in seconds.
   *
   * @default [1.5, 3.5]
   *
   * @type {Vector2}
   * @memberof GlitchProps
   */
  delay?: Vector2
  /**
   * The minimum and maximum duration of a glitch in seconds.
   *
   * @default [0.6, 1.0]
   *
   * @type {Vector2}
   * @memberof GlitchProps
   */
  duration?: Vector2
  /**
   * The strength of weak and strong glitches.
   *
   * @default [0.3, 1.0]
   *
   * @type {Vector2}
   * @memberof GlitchProps
   */
  strength?: Vector2
  /**
   * The glitch mode. Can be DISABLED | SPORADIC | CONSTANT_MILD | CONSTANT_WILD .
   *
   * @default GlitchMode.SPORADIC
   *
   * @type {GlitchMode}
   * @memberof GlitchProps
   */
  mode?: GlitchMode
  /**
   * Turn the effect on and off.
   *
   * @type {boolean}
   * @memberof GlitchProps
   */
  active?: boolean
  /**
   *
   * The threshold for strong glitches.
   *
   * @default 0.85
   *
   * @type {number}
   * @memberof GlitchProps
   */
  ratio?: number
  /**
   * The scale of the blocky glitch columns.
   *
   * @default 0.05
   *
   * @type {number}
   * @memberof GlitchProps
   */
  columns?: number
  /**
   * A chromatic aberration offset. If provided, the glitch effect will influence this offset.
   *
   * @type {Vector2}
   * @memberof GlitchProps
   */
  chromaticAberrationOffset?: Vector2
  /**
   * A perturbation map. If none is provided, a noise texture will be created.
   *
   * @type {Texture}
   * @memberof GlitchProps
   */
  perturbationMap?: Texture
  /**
   * The size of the generated noise map. Will be ignored if a perturbation map is provided.
   *
   * @default 64
   *
   * @type {number}
   * @memberof GlitchProps
   */
  dtSize?: number
}

const props = defineProps<GlitchProps>()

const { pass, effect } = useEffect(() => new GlitchEffect(props))
defineExpose({ pass, effect }) // to allow users to modify pass and effect via template ref

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

makePropWatchersUsingAllProps(
  omit(props, ['active', 'mode', 'blendFunction']),
  effect,
  () => new GlitchEffect(),
)
</script>
