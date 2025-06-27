import type { TresContext } from '../useTresContextProvider'

import type { ComputedRef, Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import { isCamera, isPerspectiveCamera } from '../../utils/is'
import type { TresCamera } from '../../types'

/**
 * Interface for the return value of the useCamera composable
 */
export interface UseCameraReturn {

  activeCamera: ComputedRef<TresCamera>
  /**
   * The list of cameras
   */
  cameras: Ref<TresCamera[]>
  /**
   * Register a camera
   * @param camera - The camera to register
   * @param active - Whether to set the camera as active
   */
  registerCamera: (camera: TresCamera, active?: boolean) => void
  /**
   * Deregister a camera
   * @param camera - The camera to deregister
   */
  deregisterCamera: (camera: TresCamera) => void
  /**
   * Set the active camera
   * @param cameraOrUuid - The camera or its UUID to set as active
   */
  setActiveCamera: (cameraOrUuid: string | TresCamera) => void
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
  const cameras = ref<TresCamera[]>([])
  const activeCamera = computed<TresCamera>(() => cameras.value[0]) // the first camera is used to make sure there is always one camera active

  /**
   * Set the active camera
   * @param cameraOrUuid - The camera or its UUID to set as active
   */
  const setActiveCamera = (cameraOrUuid: string | TresCamera) => {
    const camera = isCamera(cameraOrUuid)
      ? cameraOrUuid
      : cameras.value.find((camera: TresCamera) => camera.uuid === cameraOrUuid)

    if (!camera) { return }

    const otherCameras = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
    cameras.value = [camera, ...otherCameras]
  }

  /**
   * Register a camera
   * @param camera - The camera to register
   * @param active - Whether to set the camera as active
   */
  const registerCamera = (camera: TresCamera, active = false): void => {
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
  const deregisterCamera = (camera: TresCamera): void => {
    cameras.value = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
  }

  /**
   * Update camera aspect ratios when the window size changes
   */
  watchEffect(() => {
    if (sizes.aspectRatio.value) {
      cameras.value.forEach((camera: TresCamera) => {
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
