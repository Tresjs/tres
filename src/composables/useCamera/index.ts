import type { TresContext } from '../useTresContextProvider'

import type { ComputedRef, Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import { isCamera, isPerspectiveCamera } from '../../utils/is'
import type { Camera } from 'three'

/**
 * Interface for the return value of the useCamera composable
 */
export interface UseCameraReturn {

  activeCamera: ComputedRef<Camera | undefined>
  /**
   * The list of cameras
   */
  cameras: Ref<Camera[]>
  /**
   * Register a camera
   * @param camera - The camera to register
   * @param active - Whether to set the camera as active
   */
  registerCamera: (camera: Camera, active?: boolean) => void
  /**
   * Deregister a camera
   * @param camera - The camera to deregister
   */
  deregisterCamera: (camera: Camera) => void
  /**
   * Set the active camera
   * @param cameraOrUuid - The camera or its UUID to set as active
   */
  setActiveCamera: (cameraOrUuid: string | Camera) => void
}

/**
 * Interface for the parameters of the useCamera composable
 */
interface UseCameraParams {
  sizes: TresContext['sizes']
}

/**
 * Composable for managing cameras in a Three.js scene
 * @param params - The parameters for the composable
 * @param params.sizes - The sizes object containing window dimensions
 * @returns The camera management functions and state
 */
export const useCameraManager = ({ sizes }: UseCameraParams): UseCameraReturn => {
  const cameras = ref<Camera[]>([])
  const activeCamera = computed<Camera | undefined>(() => cameras.value[0]) // the first camera is used to make sure there is always one camera active

  /**
   * Set the active camera
   * @param cameraOrUuid - The camera or its UUID to set as active
   */
  const setActiveCamera = (cameraOrUuid: string | Camera) => {
    const camera = isCamera(cameraOrUuid)
      ? cameraOrUuid
      : cameras.value.find((camera: Camera) => camera.uuid === cameraOrUuid)

    if (!camera) { return }

    const otherCameras = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
    cameras.value = [camera, ...otherCameras]
  }

  /**
   * Register a camera
   * @param camera - The camera to register
   * @param active - Whether to set the camera as active
   */
  const registerCamera = (camera: Camera, active = false): void => {
    if (cameras.value.some(({ uuid }) => uuid === camera.uuid)) { return }
    cameras.value.push(camera)

    if (active) {
      setActiveCamera(camera.uuid)
    }
  }

  /**
   * Deregister a camera
   * @param camera - The camera to deregister
   */
  const deregisterCamera = (camera: Camera): void => {
    cameras.value = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
  }

  /**
   * Update camera aspect ratios when the window size changes
   */
  watchEffect(() => {
    if (sizes.aspectRatio.value) {
      cameras.value.forEach((camera: Camera) => {
        if (isPerspectiveCamera(camera)) {
          camera.aspect = sizes.aspectRatio.value
          camera.updateProjectionMatrix()
        }
      })
    }
  })

  return {
    activeCamera,
    cameras,
    registerCamera,
    deregisterCamera,
    setActiveCamera,
  }
}
