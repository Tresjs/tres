import { PerspectiveCamera } from 'three'
import { TresCamera } from '../../types'
import { computed, watchEffect, shallowReactive } from 'vue'
import type { TresContext } from 'src/provider'

export function useCamera({ sizes }: Pick<TresContext, 'sizes'>) {
  const cameras = shallowReactive<TresCamera[]>([]) // TODO no reactive required
  const camera = computed(() => cameras.find((camera: TresCamera) => camera.userData.IS_ACTIVE_CAMERA));

  // Camera
  function addCamera(camera: TresCamera, active = true): void {
    // Reset all cameras to inactive
    cameras.push(camera)
    if (active) {
      setCameraToActive(camera.uuid)
    }
  }

  const setCameraToActive = (cameraId: string) => {
    const camera = cameras.find((camera: TresCamera) => camera.uuid === cameraId)
    if (!camera) return

    cameras.forEach((camera: TresCamera) => camera.userData.IS_ACTIVE_CAMERA = false) // TODO use imported key
    camera.userData.IS_ACTIVE_CAMERA = true
  }

  const clearCameras = () => {
    cameras.splice(0, cameras.length)
  }

  watchEffect(() => {
    if (sizes.aspectRatio?.value) {
      console.log('camera watcher aspectRatio', sizes.aspectRatio.value) // TODO remove
      cameras.forEach((camera: TresCamera) => {
        if (camera instanceof PerspectiveCamera)
          camera.aspect = sizes.aspectRatio.value

        camera.updateProjectionMatrix();
      })
    }
  })

  return {
    cameras,
    camera,
    addCamera,
    setCameraToActive,
    clearCameras,
  }
}