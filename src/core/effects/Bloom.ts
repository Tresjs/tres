import { defineComponent, inject, ref, toRaw, unref, watchEffect } from 'vue'
import { BlurPass, KernelSize, EffectPass, BloomEffect } from 'postprocessing'
import { useCore } from '../useCore'
import { effectComposerInjectionKey } from '../injectionKeys'

export interface BloomProps {
  /**
   * The intensity of the bloom effect.
   *
   * @default 1
   * @type {number}
   * @memberof BloomProps
   */
  intensity?: number
  /**
   *  An efficient, incremental blur pass.
   *
   * @type {BlurPass}
   * @memberof BloomProps
   */
  blurPass?: BlurPass
  /**
   * The width of the render
   *
   * @type {number}
   * @memberof BloomProps
   */
  width?: number
  /**
   * The height of the render
   *
   * @type {number}
   * @memberof BloomProps
   */
  height?: number
  /**
   * The kernel size.
   *
   * @default KernelSize.LARGE
   *
   * @type {KernelSize}
   * @memberof BloomProps
   */
  kernelSize?: KernelSize
  /**
   * The luminance threshold. Raise this value to mask out darker elements in the scene. Range is [0, 1].
   *
   * @default 0.9
   *
   * @type {number}
   * @memberof BloomProps
   */
  luminanceThreshold?: number
  /**
   * Controls the smoothness of the luminance threshold. Range is [0, 1].
   *
   * @default 0.025
   *
   * @type {number}
   * @memberof BloomProps
   */
  luminanceSmoothing?: number
  /**
   * Enables mip map blur.
   *
   * @default false
   *
   * @type {boolean}
   * @memberof BloomProps
   */
  mipMapBlur?: boolean
}
export const Bloom = defineComponent<BloomProps>({
  name: 'Bloom',
  props: [
    'intensity',
    'blurPass',
    'width',
    'height',
    'kernelSize',
    'luminanceThreshold',
    'luminanceSmoothing',
  ] as unknown as undefined,

  async setup(props, { expose }) {
    const { state } = useCore()
    const composer = inject<any>(effectComposerInjectionKey)
    const pass = ref<EffectPass | null>(null)

    expose({ getPass: () => pass.value })

    watchEffect(() => {
      if (state.camera && composer && composer.value) {
        pass.value = new EffectPass(unref(state.camera), new BloomEffect(props))
        composer?.value?.addPass(toRaw(pass.value))
      }
    })

    return () => {
      pass
    }
  },
})
