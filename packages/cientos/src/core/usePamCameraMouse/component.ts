import { defineComponent } from 'vue'
import { usePamCameraMouse } from '.'
import { useCientos } from '../useCientos'

export const PamCameraMouse = defineComponent({
  name: 'PamCameraMouse',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    factor: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  setup(props: any) {
    const { state } = useCientos()
    const camera = state?.camera?.value

    const PamCameraMouse = usePamCameraMouse(props.disabled as boolean, props.factor as number, camera)

    return () => {
      PamCameraMouse
    }
  },
})
