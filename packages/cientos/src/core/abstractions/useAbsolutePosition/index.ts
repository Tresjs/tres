import { OrthographicCamera, PerspectiveCamera, Vector3 } from 'three'
import { logWarning, useTresContext } from '@tresjs/core'
import { computed, toValue } from 'vue'
import type { ComputedRef, MaybeRef } from 'vue'

/**
 * Position along horizontal axis (0-1, where 0.5 is center)
 * Exactly one of left or right may be provided (not both)
 */
type HorizontalPosition = {
  left?: MaybeRef<number>
  right?: never
} | {
  right?: MaybeRef<number>
  left?: never
}

/**
 * Position along vertical axis (0-1, where 0.5 is center)
 * Exactly one of top or bottom may be provided (not both)
 */
type VerticalPosition = {
  top?: MaybeRef<number>
  bottom?: never
} | {
  bottom?: MaybeRef<number>
  top?: never
}

export type UseAbsolutePositionOptions = {
  /**
   * For PerspectiveCamera: Manually set the perpendicular distance
   * from the camera to a plane containing the target object.
   */
  distance?: MaybeRef<number>
} & HorizontalPosition & VerticalPosition

export interface UseAbsolutePositionReturn {
  position: ComputedRef<Vector3>
}

export function useAbsolutePosition(options: UseAbsolutePositionOptions): UseAbsolutePositionReturn {
  const { camera, sizes } = useTresContext()

  const distance = computed(() => {
    if (!(camera.activeCamera.value instanceof PerspectiveCamera)) {
      return 0
    }

    const maybeDistance = toValue(options.distance)
    if (maybeDistance !== undefined) {
      return maybeDistance
    }

    logWarning('useAbsolutePosition: distance must be provided for PerspectiveCamera')
    return 0
  })

  // Dimensions of the "plane" rendered by the active camera
  const plane = computed(() => {
    const activeCamera = camera.activeCamera.value

    let height: number = 0
    let width: number = 0

    if (activeCamera instanceof PerspectiveCamera) {
      const fov = activeCamera.fov
      const zoom = activeCamera.zoom
      height = (2 * Math.tan(fov * Math.PI / 180 / 2) * distance.value) / zoom
      width = height * sizes.aspectRatio.value
    }
    else if (activeCamera instanceof OrthographicCamera) {
      const zoom = activeCamera.zoom
      height = (activeCamera.top - activeCamera.bottom) / zoom
      width = (activeCamera.right - activeCamera.left) / zoom
    }
    else if (activeCamera) {
      logWarning(`useAbsolutePosition: Unhandled active camera type, only PerspectiveCamera and OrthographicCamera are supported`, activeCamera)
    }

    return { height, width }
  })

  const position = computed(() => {
    const left = toValue(options.left)
    const right = toValue(options.right)
    const top = toValue(options.top)
    const bottom = toValue(options.bottom)

    // Default to center if no positioning specified
    const leftPos = left ?? (right !== undefined ? 1 - right : 0.5)
    const topPos = top ?? (bottom !== undefined ? 1 - bottom : 0.5)

    const x = plane.value.width * (leftPos - 0.5)
    const y = plane.value.height * (1 - topPos - 0.5) // Invert topPos so it behaves like CSS
    const z = 0

    return new Vector3(x, y, z)
  })

  return { position }
}
