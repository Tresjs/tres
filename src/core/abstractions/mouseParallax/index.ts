import { defineComponent, computed } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { useWindowSize, useMouse, watchOnce } from '@vueuse/core'
import { useCientos } from '../../useCientos'
import { Group } from 'three'

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
   * @type {number}
   * @default 2.5
   * @memberof MouseParallaxProps
   *
   **/
  ease?: number
}

export const MouseParallax = defineComponent<MouseParallaxProps>({
  name: 'MouseParallax',
  props: ['disabled', 'factor', 'ease'] as unknown as undefined,
  setup(props) {
    const { state } = useCientos()

    const { x, y } = useMouse()
    const { width, height } = useWindowSize()

    const { onLoop } = useRenderLoop()
    const cameraGroup = new Group()
    state.scene?.add(cameraGroup)
    const easeFactor = props.ease || 2.5
    const factor = props.factor || 2.5

    const cursorX = computed(() => (x.value / width.value - 0.5) * factor)
    const cursorY = computed(() => -(y.value / height.value - 0.5) * factor)

    watchOnce(() => state.camera, () => {
      if(state.camera){
        cameraGroup.add(state.camera)
      }
    })

    onLoop(({ delta }) => {
      if (props.disabled) return
      cameraGroup.position.x += (cursorX.value - cameraGroup.position.x) * easeFactor * delta
      cameraGroup.position.y += (cursorY.value - cameraGroup.position.y) * easeFactor * delta
    })
    return () => {
      null
    }
  },
})
