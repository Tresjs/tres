import { defineComponent, watchEffect } from 'vue'
import { useMouseParallax } from '.'
import { useCientos } from '../../../core/useCientos'

export interface MouseParallaxProps {
  /**
   * Whether to disable the mouse controls.
   * @type {boolean}
   * @default false
   * @memberof MouseParallaxProps
   *
   */
  disabled?: boolean
  /**
   * The factor to multiply the mouse movement by.
   * @type {number}
   * @default 2.5
   * @memberof MouseParallaxProps
   *
   **/
  factor?: number
  /**
   * The factor to multiply the mouse movement by.
   * @type {boolean}
   * @default true
   * @memberof MouseParallaxProps
   *
   **/
  ease?: boolean
}

export const MouseParallax = defineComponent<MouseParallaxProps>({
  name: 'PamCameraMouse',
  props: ['disabled', 'factor', 'ease'] as unknown as undefined,
  setup(props) {
    const { state } = useCientos()

    watchEffect(() => {
      if (state?.camera) {
        const camera = state?.camera

        useMouseParallax(props.disabled as boolean, props.factor as number, props.ease as boolean, camera)
      }
    })
    return () => {
      null
    }
  },
})
