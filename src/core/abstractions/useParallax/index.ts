import { computed } from 'vue'
import { useLogger, useRenderLoop } from '@tresjs/core'
import { useWindowSize, useMouse } from '@vueuse/core'
import { Camera, Group } from 'three'
import { useCientos } from '../../useCientos'

export function useMouseParallax(disabled = false, factor = 2.5, ease = true, camera: Camera | undefined) {
  const { x, y } = useMouse()
  const { logWarning } = useLogger()
  const { state } = useCientos()
  const { width, height } = useWindowSize()

  const { onLoop } = useRenderLoop()
  const cameraGroup = new Group()
  const easeFactor = ease ? 2.5 : 30

  const cursorX = computed(() => (x.value / width.value - 0.5) * factor)
  const cursorY = computed(() => -(y.value / height.value - 0.5) * factor)
  if (camera && state.scene) {
    cameraGroup.add(camera)
    state.scene?.add(cameraGroup)
    onLoop(({ delta }) => {
      if (disabled) return
      cameraGroup.position.x += (cursorX.value - cameraGroup.position.x) * easeFactor * delta
      cameraGroup.position.y += (cursorY.value - cameraGroup.position.y) * easeFactor * delta
    })
  } else {
    logWarning('Scene must contain a Camera component to use this composable')
  }
}
