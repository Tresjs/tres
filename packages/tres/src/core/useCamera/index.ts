import { useTres } from '/@/core/'
import { PerspectiveCamera, OrthographicCamera } from 'three'

import { computed, ComputedRef, watch } from 'vue'

export enum CameraType {
  Perspective = 'Perspective',
  Orthographic = 'Orthographic',
}

export type Camera = PerspectiveCamera | OrthographicCamera

export type CameraState = {
  cameras: Array<Camera>
}

export interface PerspectiveCameraOptions {
  fov?: number
  near?: number
  far?: number
}

export interface OrthographicCameraOptions {
  left?: number
  right?: number
  top?: number
  bottom?: number
  near?: number
  far?: number
}

interface UseCameraReturn {
  activeCamera: ComputedRef<Camera>
  createCamera: (cameraType?: CameraType, options?: PerspectiveCameraOptions | OrthographicCameraOptions) => Camera
  updateCamera: () => void
  pushCamera: (camera: Camera) => void
  clearCameras: () => void
}

const cameraState: CameraState = {
  cameras: [],
}

const VERTICAL_FIELD_OF_VIEW = 45
let camera: Camera

export function useCamera(): UseCameraReturn {
  const { state, setState } = useTres()

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
      camera = new PerspectiveCamera(fov, state.aspectRatio?.value || 1, near, far)
      cameraState.cameras.push(camera as PerspectiveCamera)
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
      cameraState.cameras.push(camera as OrthographicCamera)
    }

    cameraState.cameras.push(camera)
    return camera
  }

  const activeCamera = computed(() => cameraState.cameras[0])
  setState('camera', activeCamera)

  function updateCamera() {
    if (activeCamera.value instanceof PerspectiveCamera && state.aspectRatio) {
      activeCamera.value.aspect = state.aspectRatio.value
    }
    activeCamera.value.updateProjectionMatrix()
  }

  function pushCamera(camera: Camera): void {
    /*     if (camera && currentCamera) {
      currentCamera.value = camera
      setState('camera', currentCamera)
    } */
    cameraState.cameras.push(camera)
    if (camera instanceof PerspectiveCamera && state.aspectRatio) {
      camera.aspect = state.aspectRatio.value
    }
    camera.updateProjectionMatrix()
  }

  function clearCameras() {
    state.cameras = []
  }

  if (state.aspectRatio) {
    watch(state.aspectRatio, updateCamera)
  }
  return {
    activeCamera,
    createCamera,
    updateCamera,
    pushCamera,
    clearCameras,
  }
}
