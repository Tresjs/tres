import { Texture, Vector2 } from 'three'
import { defineComponent, inject, ref, toRaw, unref, watch, watchEffect } from 'vue'
import { EffectPass, GlitchEffect, GlitchMode } from 'postprocessing'
import { useCore } from '../useCore'
import { effectComposerInjectionKey } from '../injectionKeys'

export interface GlitchProps {
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
  peturbationMap?: Texture
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
export const Glitch = defineComponent<GlitchProps>({
  name: 'Glitch',
  props: [
    'delay',
    'duration',
    'strength',
    'mode',
    'active',
    'ratio',
    'columns',
    'chromaticAberrationOffset',
    'peturbationMap',
    'dtSize',
  ] as unknown as undefined,

  async setup(props, { expose }) {
    const { state } = useCore()
    const composer = inject<any>(effectComposerInjectionKey)
    const pass = ref<EffectPass | null>(null)

    expose({ getPass: () => pass.value })

    watchEffect(() => {
      if (state.camera && composer && composer.value) {
        pass.value = new EffectPass(unref(state.camera), new GlitchEffect(props))
        composer.value?.addPass(toRaw(pass.value))
      }
    })

    watch(
      () => props.active,
      value => {
        if (pass.value) {
          pass.value.enabled = value as boolean
        }
      },
    )

    return () => {
      pass
    }
  },
})
