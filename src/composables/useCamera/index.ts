import { computed, watchEffect, ref, onUnmounted } from 'vue'
import { Camera, OrthographicCamera, PerspectiveCamera } from 'three'

import type { TresScene } from '../../types'
import type { TresContext } from '../useTresContextProvider'


interface TresCamera extends Camera {
  userData: {
    tres__isActiveCamera: boolean
    [key: string]: any
  }
}

export const useCamera = ({ sizes, scene }: Pick<TresContext, 'sizes'> & { scene: TresScene }) => {

  // computed "camera" relies on this to be a ref (not a shallowRef)
  // the computed does not trigger, when for example the camera postion changes
  const cameras = ref<TresCamera[]>([])
  const camera = computed<TresCamera | undefined>(
    () => cameras.value.find(({ userData }) => userData.tres__isActiveCamera)
  )

  const addCamera = (newCamera: Camera, active = true) => {
    if (cameras.value.some(({ uuid }) => uuid === newCamera.uuid))
      return

    cameras.value.push(newCamera as TresCamera)

    if (active)
      setCameraActive(newCamera)
  }

  const removeCamera = (camera: Camera) => {
    if ((camera as TresCamera).userData.tres__isActiveCamera) {
      const lastCamera = cameras.value[cameras.value.length - 1];
      if (lastCamera)
        setCameraActive(lastCamera.uuid)
    }

    cameras.value = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
  }

  const setCameraActive = (cameraOrUuid: string | Camera) => {
    const camera = cameraOrUuid instanceof Camera ?
      cameraOrUuid :
      cameras.value.find((camera: Camera) => camera.uuid === cameraOrUuid)

    if (!camera) return

    cameras.value.forEach(({ userData }) => userData.tres__isActiveCamera = false)

    const tresCamera = camera as TresCamera
    tresCamera.userData.tres__isActiveCamera = true
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

  scene.userData.tres__registerCamera = addCamera
  scene.userData.tres__deregisterCamera = removeCamera

  onUnmounted(() => {
    clearCameras()
  })

  return {
    camera,
    cameras,
    addCamera,
    removeCamera,
    setCameraActive,
  }
}