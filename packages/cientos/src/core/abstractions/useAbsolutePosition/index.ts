import { OrthographicCamera, PerspectiveCamera, Vector3 } from 'three'
import { logWarning, useLoop, useTresContext } from '@tresjs/core'
import { computed, ref, toValue } from 'vue'
import type { MaybeRef, Ref } from 'vue'

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
   * The perpendicular distance from the camera to a plane
   * containing the target object.
   *
   * @remarks For OrthographicCamera, the distance only affects
   * the order in which objects are rendered (like CSS `z-index`).
   *
   * @defaultValue 10
   */
  distance?: MaybeRef<number>
} & HorizontalPosition & VerticalPosition

export interface UseAbsolutePositionReturn {
  position: Readonly<Ref<Vector3>>
}

export function useAbsolutePosition(options: UseAbsolutePositionOptions): UseAbsolutePositionReturn {
  const { camera, sizes } = useTresContext()

  const zoom = ref(camera.activeCamera.value.zoom)
  const position = ref(new Vector3())
  const distance = computed(() => {
    // Reflect `zoom` on position
    return (toValue(options.distance) || 10) / zoom.value
  })

  // Dimensions of the "plane" captured by the active camera
  const plane = computed(() => {
    const activeCamera = camera.activeCamera.value

    let height: number = 0
    let width: number = 0

    if (activeCamera instanceof PerspectiveCamera) {
      const fov = activeCamera.fov
      height = (2 * Math.tan(fov * Math.PI / 180 / 2) * distance.value) / zoom.value
      width = height * sizes.aspectRatio.value
    }
    else if (activeCamera instanceof OrthographicCamera) {
      height = (activeCamera.top - activeCamera.bottom) / zoom.value
      width = (activeCamera.right - activeCamera.left) / zoom.value
    }
    else if (activeCamera) {
      logWarning(`useAbsolutePosition: Unhandled active camera type, only PerspectiveCamera and OrthographicCamera are supported`, activeCamera)
    }

    return { height, width }
  })

  const positionFromOrigin = computed(() => {
    const left = toValue(options.left)
    const right = toValue(options.right)
    const top = toValue(options.top)
    const bottom = toValue(options.bottom)

    // Default to center if no positioning specified
    const leftPos = left ?? (right !== undefined ? 1 - right : 0.5)
    const topPos = top ?? (bottom !== undefined ? 1 - bottom : 0.5)

    const x = plane.value.width * (leftPos - 0.5)
    const y = plane.value.height * (1 - topPos - 0.5) // Invert y so it behaves like CSS
    const z = -distance.value

    return new Vector3(x, y, z)
  })

  useLoop().onBeforeRender(() => {
    zoom.value = camera.activeCamera.value.zoom

    const cameraPosition = camera.activeCamera.value.position.clone()

    position.value = cameraPosition.add(positionFromOrigin.value.clone().applyQuaternion(camera.activeCamera.value.quaternion))
  })

  return { position }
}
