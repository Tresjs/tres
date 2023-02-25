import { watchEffect, computed, defineComponent } from 'vue'
import { useWindowSize, useMouse } from '@vueuse/core'
import { useCientos } from '../useCientos'

export const usePamMouse = defineComponent({
  name: 'usePamMouse',
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
  setup(props) {
    const { state } = useCientos()
    const { x, y } = useMouse()
    const { width, height } = useWindowSize()
    const cameraX = computed(() => (x.value / width.value - 0.5) * props.factor)
    const cameraY = computed(() => -(y.value / height.value - 0.5) * props.factor)

    if (state.camera) {
      const { x: initX, y: initY } = state.camera.value.position

      watchEffect(() => {
        if (props.disabled) return
        if (state.camera) {
          state.camera.value.position.x = initX + cameraX.value
          state.camera.value.position.y = initY + cameraY.value
        }
      })
    }
  },
})
