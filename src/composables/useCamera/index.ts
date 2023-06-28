import { TresCamera } from 'src/types'
import { useTres } from '../useTres'
import { PerspectiveCamera, OrthographicCamera } from 'three'

import { toRef, Ref, watchEffect } from 'vue'

export enum CameraType {
  Perspective = 'Perspective',
  Orthographic = 'Orthographic',
}

export type Camera = PerspectiveCamera | OrthographicCamera

export interface PerspectiveCameraOptions {
  /**
   * Camera frustum vertical field of view, from bottom to top of view, in degrees.
   *
   * @type {number}
   * @memberof PerspectiveCameraOptions
   */
  fov?: number
  /**
   * Camera frustum near plane.
   *
   * @type {number}
   * @memberof PerspectiveCameraOptions
   */
  near?: number
  /**
   * Camera frustum far plane.
   *
   * @type {number}
   * @memberof PerspectiveCameraOptions
   */
  far?: number
}

export interface OrthographicCameraOptions {
  /**
   * Camera frustum left plane.
   *
   * @type {number}
   * @memberof OrthographicCameraOptions
   */
  left?: number
  /**
   * Camera frustum right plane.
   *
   * @type {number}
   * @memberof OrthographicCameraOptions
   */
  right?: number
  /**
   * Camera frustum top plane.
   *
   * @type {number}
   * @memberof OrthographicCameraOptions
   */
  top?: number
  /**
   * Camera frustum bottom plane.
   *
   * @type {number}
   * @memberof OrthographicCameraOptions
   */
  bottom?: number
  /**
   * Camera frustum near plane.
   *
   * @type {number}
   * @memberof OrthographicCameraOptions
   */
  near?: number
  /**
   * Camera frustum far plane.
   *
   * @type {number}
   * @memberof OrthographicCameraOptions
   */
  far?: number
}

interface UseCameraReturn {
  activeCamera: Ref<TresCamera | undefined>
  createCamera: (cameraType?: CameraType, options?: PerspectiveCameraOptions | OrthographicCameraOptions) => Camera
  updateCamera: () => void
  pushCamera: (camera: TresCamera) => void
  clearCameras: () => void
  setFirstCamera: (camera: TresCamera) => void
}

const VERTICAL_FIELD_OF_VIEW = 45
let camera: Camera

/**
 * Create and update cameras
 *
 * ```ts
 * import { useCamera } from '@tresjs/core'
 * const { createCamera, updateCamera } = useCamera()
 * const camera = createCamera(new PerspectiveCamera(45, 1, 0.1, 1000))
 * updateCamera()
 * ```
 *
 * @export
 * @return {*}  {UseCameraReturn}
 */
export function useCamera(): UseCameraReturn {
  const { state, setState, aspectRatio } = useTres()
  /* const aspectRatio = inject('aspect-ratio') */
  /**
   * Create camera and push to Tres `state.cameras` array
   *
   * ```ts
   * import { useCamera } from '@tresjs/core'
   * const { createCamera } = useCamera()
   * const camera = createCamera(new PerspectiveCamera(45, 1, 0.1, 1000))
   * ```
   *
   * @param {*} [cameraType=CameraType.Perspective]
   * @param {(PerspectiveCameraOptions | OrthographicCameraOptions)} [options]
   * @return {*}
   */
  function createCamera(
    cameraType = CameraType.Perspective,
    options?: PerspectiveCameraOptions | OrthographicCameraOptions,
  ) {
    if (cameraType === CameraType.Perspective) {
      const { near, far, fov } = (options as PerspectiveCameraOptions) || {
        near: 0.1,
        far: 1000,
        fov: VERTICAL_FIELD_OF_VIEW,
      }
      camera = new PerspectiveCamera(fov, state.aspectRatio?.value || window.innerWidth / window.innerHeight, near, far)
      state.cameras?.push(camera as PerspectiveCamera)
    } else {
      const { left, right, top, bottom, near, far } = (options as OrthographicCameraOptions) || {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.1,
        far: 1000,
      }
      camera = new OrthographicCamera(left, right, top, bottom, near, far)
      state.cameras?.push(camera as OrthographicCamera)
    }
    state.camera = camera

    setState('camera', state.camera)

    return camera
  }

  /**
   * Update camera aspect ratio and projection matrix
   *
   */
  function updateCamera() {
    if (state.camera instanceof PerspectiveCamera && state.aspectRatio) {
      state.camera.aspect = state.aspectRatio.value
    }
    state.camera?.updateProjectionMatrix()
  }

  /**
   * Push camera to cameras array and update aspect ratio if camera is PerspectiveCamera
   *
   * @param {Camera} camera
   */
  function pushCamera(camera: Camera): void {
    state.cameras?.push(camera)
    if (camera instanceof PerspectiveCamera && state.aspectRatio) {
      camera.aspect = state.aspectRatio.value
    }
    camera.updateProjectionMatrix()
    setState('camera', camera)
  }

  function setFirstCamera(camera: Camera): void {
    if (state.cameras?.length === 0) {
      pushCamera(camera)
    }
  }

  /**
   * Clear cameras array
   *
   */
  function clearCameras() {
    state.cameras = []
  }

  watchEffect(() => {
    if (aspectRatio?.value) {
      updateCamera()
    }
  })

  return {
    activeCamera: toRef(state, 'camera'),
    createCamera,
    updateCamera,
    pushCamera,
    clearCameras,
    setFirstCamera,
  }
}
