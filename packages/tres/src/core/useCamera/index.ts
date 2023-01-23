import { useTres } from '/@/core/'
import { PerspectiveCamera, OrthographicCamera } from 'three'

import { computed, ComputedRef, watch, inject, Ref } from 'vue'

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
  updateCurrentCamera: () => void
  pushCamera: (camera: Camera) => void
  clearCameras: () => void
}

const state: CameraState = {
  cameras: [],
}

const VERTICAL_FIELD_OF_VIEW = 45
let camera: Camera

export function useCamera(): UseCameraReturn {
  const aspectRatio = inject<ComputedRef<number>>('aspect-ratio')

  const { setState } = useTres()

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
      camera = new PerspectiveCamera(fov, aspectRatio?.value || 1, near, far)
      state.cameras.push(camera as PerspectiveCamera)
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
      state.cameras.push(camera as OrthographicCamera)
    }
    return camera
  }

  const activeCamera = computed(() => state.cameras[0])

  function updateCurrentCamera() {
    if (activeCamera.value instanceof PerspectiveCamera && aspectRatio) {
      activeCamera.value.aspect = aspectRatio.value
    }
    activeCamera.value.updateProjectionMatrix()
  }

  function pushCamera(camera: Camera): void {
    const currentCamera = inject<Ref<Camera>>('camera')
    if (camera && currentCamera) {
      currentCamera.value = camera
      setState('camera', currentCamera.value)
    }
    state.cameras.push(camera)
    if (camera instanceof PerspectiveCamera && aspectRatio) {
      camera.aspect = aspectRatio.value
    }
    camera.updateProjectionMatrix()
  }

  function clearCameras() {
    state.cameras = []
  }

  if (aspectRatio) {
    watch(aspectRatio, updateCurrentCamera)
  }
  return {
    activeCamera,
    createCamera,
    updateCurrentCamera,
    pushCamera,
    clearCameras,
  }
}
