import { OBJECT_3D_USER_DATA_KEYS } from '../../keys'
import { computed, watchEffect, ref } from 'vue'
import { Camera, OrthographicCamera, PerspectiveCamera } from 'three'

import type { TresContext } from '../../provider/index'

export function useCamera({ sizes }: Pick<TresContext, 'sizes'>) {
  const { IS_ACTIVE_CAMERA } = OBJECT_3D_USER_DATA_KEYS

  const cameras = ref<Camera[]>([])
  const camera = computed<Camera | undefined>(
    () => cameras.value.find(({ userData }) => userData[IS_ACTIVE_CAMERA])
  )

  function addCamera(camera: Camera, active = true): void {
    // Reset all cameras to inactive
    cameras.value.push(camera)
    if (active)
      setCameraToActive(camera.uuid)
  }

  const setCameraToActive = (cameraId: string) => {
    const camera = cameras.value.find((camera: Camera) => camera.uuid === cameraId)
    if (!camera) return

    cameras.value.forEach(({ userData }) => userData[IS_ACTIVE_CAMERA] = false)
    camera.userData[IS_ACTIVE_CAMERA] = true
  }

  const clearCameras = () => {
    cameras.value.splice(0, cameras.value.length)
  }

  watchEffect(() => {
    if (sizes.aspectRatio.value) {
      cameras.value.forEach((camera: Camera) => {
        if (camera instanceof PerspectiveCamera)
          camera.aspect = sizes.aspectRatio.value

        if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera)
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