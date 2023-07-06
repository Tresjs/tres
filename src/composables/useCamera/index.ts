import { OBJECT_3D_USER_DATA_KEYS } from '../../keys'
import { computed, watchEffect, ref, onUnmounted } from 'vue'
import { Camera, OrthographicCamera, PerspectiveCamera, Scene } from 'three'

import type { TresContext } from '../../provider/index'

export function useCamera({ sizes, scene }: Pick<TresContext, 'sizes'> & { scene: Scene }) {
  const { IS_ACTIVE_CAMERA, REGISTER_CAMERA, DEREGISTER_CAMERA } = OBJECT_3D_USER_DATA_KEYS

  // computed "camera" relies on this to be a ref (not a shallowRef)
  // the computed does not trigger, when for example the camera postion changes
  const cameras = ref<Camera[]>([])
  const camera = computed<Camera | undefined>(
    () => cameras.value.find(({ userData }) => userData[IS_ACTIVE_CAMERA])
  )

  const addCamera = (newCamera: Camera, active = true) => {
    if (cameras.value.some(({ uuid }) => uuid === newCamera.uuid))
      return

    cameras.value.push(newCamera)

    if (active)
      setCameraActive(newCamera.uuid)
  }

  const removeCamera = (camera: Camera) => {
    if (camera.userData[IS_ACTIVE_CAMERA]) {
      const lastCamera = cameras.value[cameras.value.length - 1];
      if (lastCamera)
        setCameraActive(lastCamera.uuid)
    }

    cameras.value = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
  }

  const setCameraActive = (cameraUuid: string) => { // TODO add setCameraActiveByUuid
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
  scene.userData[DEREGISTER_CAMERA] = removeCamera

  onUnmounted(() => {
    clearCameras()
  })

  return {
    camera,
    cameras,
    addCamera,
    removeCamera,
    clearCameras,
    setCameraActive,
  }
}