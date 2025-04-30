import type { TresContext } from '../useTresContextProvider'

import type { ComputedRef, Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import { isOrthographicCamera, isPerspectiveCamera } from '../../utils/is'
import type { Camera } from 'three'

/**
 * Interface for the return value of the useCamera composable
 */
export interface UseCameraReturn {
  /**
   * The active camera
   */
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
  // Store all registered cameras
  const cameras = ref<Camera[]>([])
  // Store the UUID of the active camera
  const activeCameraUuid = ref<string | null>(null)

  // Computed property that returns the active camera
  const activeCamera = computed<Camera | undefined>(
    () => cameras.value.find(camera => camera.uuid === activeCameraUuid.value),
  )

  /**
   * Set the active camera
   * @param cameraOrUuid - The camera or its UUID to set as active
   */
  const setActiveCamera = (cameraOrUuid: string | Camera) => {
    const uuid = typeof cameraOrUuid === 'string' ? cameraOrUuid : cameraOrUuid.uuid
    const cameraExists = cameras.value.some((camera: Camera) => camera.uuid === uuid)

    if (cameraExists) {
      activeCameraUuid.value = uuid
    }
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

    // If the deregistered camera was active, clear the active camera
    if (activeCameraUuid.value === camera.uuid) {
      activeCameraUuid.value = null
    }
  }

  /**
   * Update camera aspect ratios when the window size changes
   */
  watchEffect(() => {
    if (sizes.aspectRatio.value) {
      cameras.value.forEach((camera: Camera) => {
        // Update perspective camera
        if (isPerspectiveCamera(camera)) {
          camera.aspect = sizes.aspectRatio.value
          camera.updateProjectionMatrix()
        }
        // Update orthographic camera
        /* else if (isOrthographicCamera(camera)) {
          const frustumSize = 10
          const aspect = sizes.aspectRatio.value

          camera.left = frustumSize * aspect / -2
          camera.right = frustumSize * aspect / 2
          camera.top = frustumSize / 2
          camera.bottom = frustumSize / -2

          camera.updateProjectionMatrix()
        } */
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
