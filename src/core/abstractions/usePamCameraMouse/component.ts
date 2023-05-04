import { defineComponent, watchEffect } from 'vue'
import { usePamCameraMouse } from '.'
import { useCientos } from '/@/core/useCientos'

export interface PamCameraMouseProps {
  /**
   * Whether to disable the mouse controls.
   * @type {boolean}
   * @default false
   * @memberof PamCameraMouseProps
   *
   */
  disabled?: boolean
  /**
   * The factor to multiply the mouse movement by.
   * @type {number}
   * @default 5
   * @memberof PamCameraMouseProps
   *
   **/
  factor?: number
}

export const PamCameraMouse = defineComponent<PamCameraMouseProps>({
  name: 'PamCameraMouse',
  props: ['disabled', 'factor'] as unknown as undefined,
  setup(props) {
    const { state } = useCientos()

    watchEffect(() => {
      if (state?.camera) {
        const camera = state?.camera

        usePamCameraMouse(props.disabled as boolean, props.factor as number, camera)
      }
    })
    return () => {
      null
    }
  },
})
