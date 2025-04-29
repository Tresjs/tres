import type { TresContext } from '../useTresContextProvider'

import type { ComputedRef, Ref } from 'vue'
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { isOrthographicCamera, isPerspectiveCamera } from '../../utils/is'
import type { TresCamera } from '../../types'

/**
 * Interface for the return value of the useCamera composable
 */
export interface UseCameraReturn {
  /**
   * The active camera
   */
  activeCamera: ComputedRef<TresCamera | undefined>
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
  // Store all registered cameras
  const cameras = ref<TresCamera[]>([])
  // Store the UUID of the active camera
  const activeCameraUuid = ref<string | null>(null)

  // Computed property that returns the active camera
  const activeCamera = computed<TresCamera | undefined>(
    () => cameras.value.find(camera => camera.uuid === activeCameraUuid.value),
  )

  /**
   * Set the active camera
   * @param cameraOrUuid - The camera or its UUID to set as active
   */
  const setActiveCamera = (cameraOrUuid: string | Camera) => {
    const uuid = typeof cameraOrUuid === 'string' ? cameraOrUuid : cameraOrUuid.uuid
    const cameraExists = cameras.value.some((camera: TresCamera) => camera.uuid === uuid)

    if (!cameraExists) {
      activeCameraUuid.value = uuid
    }
  }

  /**
   * Register a camera
   * @param camera - The camera to register
   * @param active - Whether to set the camera as active
   */
  const registerCamera = (camera: TresCamera, active = false): void => {
    // Skip if camera is already registered
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
      cameras.value.forEach((camera: TresCamera) => {
        // Update perspective camera
        if (isPerspectiveCamera(camera)) {
          camera.aspect = sizes.aspectRatio.value
          camera.updateProjectionMatrix()
        }
        // Update orthographic camera
        else if (isOrthographicCamera(camera)) {
          // Use a fixed frustum size for better visualization
          const frustumSize = 10
          const aspect = sizes.aspectRatio.value

          camera.left = frustumSize * aspect / -2
          camera.right = frustumSize * aspect / 2
          camera.top = frustumSize / 2
          camera.bottom = frustumSize / -2

          // Ensure the camera is at a good position to see the scene
          if (!camera.position.z) {
            camera.position.z = 10
          }

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
