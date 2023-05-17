import { computed } from 'vue'
import { useLogger, useTres, useRenderLoop } from '@tresjs/core'
import { useWindowSize, useMouse } from '@vueuse/core'
import { Camera, Group } from 'three'

export function useMouseParallax(disabled = false, factor = 2.5, ease = true, camera: Camera | undefined) {
  const { x, y } = useMouse()
  const { logWarning } = useLogger()
  const { scene } = useTres()
  const { width, height } = useWindowSize()

  const { onLoop } = useRenderLoop()
  const cameraGroup = new Group()
  console.log('jaime ~ useParallax ~ ease:', ease);
  const easeFactor = ease ? 2.5 : 30

  const cursorX = computed(() => (x.value / width.value - 0.5) * factor)
  const cursorY = computed(() => -(y.value / height.value - 0.5) * factor)
  if (camera) {
    cameraGroup.add(camera)
    scene.value.add(cameraGroup)
    onLoop(({ delta }) => {
      if (disabled) return
      cameraGroup.position.x += (cursorX.value - cameraGroup.position.x) * easeFactor * delta
      cameraGroup.position.y += (cursorY.value - cameraGroup.position.y) * easeFactor * delta
    })
  } else {
    logWarning('Scene must contain a Camera component to use this composable')
  }
}
