import { OBJECT_3D_USER_DATA_KEYS } from '../../keys'
import { computed, watchEffect, ref, onUnmounted } from 'vue'
import { Camera, OrthographicCamera, PerspectiveCamera, Scene } from 'three'

import type { TresContext } from '../../provider/index'

export function useCamera({ sizes, scene }: Pick<TresContext, 'sizes'> & { scene: Scene }) {
  const { IS_ACTIVE_CAMERA, REGISTER_CAMERA } = OBJECT_3D_USER_DATA_KEYS

  // computed "camera" relies on this to be a ref (not a shallowRef)
  // the computed does not trigger, when for example the camera postion changes
  const cameras = ref<Camera[]>([])
  const camera = computed<Camera | undefined>(
    () => cameras.value.find(({ userData }) => userData[IS_ACTIVE_CAMERA])
  )

  const addCamera = (camera: Camera, active = true) => {
    if (!cameras.value.some(({ uuid }) => uuid === camera.uuid))
      cameras.value.push(camera)

    if (active)
      setCameraActive(camera.uuid)
  }

  const setCameraActive = (cameraUuid: string) => {
    const camera = cameras.value.find((camera: Camera) => camera.uuid === cameraUuid)
    if (!camera) return

    cameras.value.forEach(({ userData }) => userData[IS_ACTIVE_CAMERA] = false)
    camera.userData[IS_ACTIVE_CAMERA] = true
  }

  const clearCameras = () => {
    cameras.value = []
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

  scene.userData[REGISTER_CAMERA] = addCamera

  onUnmounted(() => {
    clearCameras()
  })

  return {
    cameras,
    camera,
    addCamera,
    setCameraActive,
    clearCameras,
  }
}