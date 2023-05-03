import { watchEffect, computed } from 'vue'
import { Camera } from 'three'
import { useWindowSize, useMouse } from '@vueuse/core'
import { useLogger } from '@tresjs/core'

export function usePamCameraMouse(disabled = false, factor = 5, camera: Camera | undefined) {
  const { x, y } = useMouse()
  const { logWarning } = useLogger()
  const { width, height } = useWindowSize()
  const cameraX = computed(() => (x.value / width.value - 0.5) * factor)
  const cameraY = computed(() => -(y.value / height.value - 0.5) * factor)
  if (camera) {
    const { x: initX, y: initY } = camera.position
    watchEffect(() => {
      if (disabled) return
      if (camera) {
        camera.position.x = initX + cameraX.value
        camera.position.y = initY + cameraY.value
      }
    })
  } else {
    logWarning('Scene must contain a Camera component to use this composable')
  }
}
