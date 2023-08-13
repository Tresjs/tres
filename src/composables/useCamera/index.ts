import { Camera, OrthographicCamera, PerspectiveCamera } from 'three'
import { computed, triggerRef, watch, watchEffect } from 'vue'

import type { TresContext } from '../useTresContextProvider'


export const useCamera = ({ sizes, scene }: Pick<TresContext, 'sizes' | 'scene'>) => {
  const cameras = computed<Camera[]>(() => scene.value.children.filter((i): i is Camera => (i as any).isCamera))
  const camera = computed<Camera | undefined>(
    () => cameras.value[0],
  )
  // don't known why need manually trigger here
  watch(camera, () => {
    triggerRef(cameras)
  }, { deep: true })

  const addCamera = (newCamera: Camera, active = false) => {
    if (cameras.value.some(({ uuid }) => uuid === newCamera.uuid))
      return

    if (active)
      setCameraActive(newCamera)
    else
      cameras.value.push(newCamera)
  }

  const removeCamera = (camera: Camera) => {
    scene.value.remove(camera)
  }

  const setCameraActive = (cameraOrUuid: string | Camera) => {
    const camera = cameraOrUuid instanceof Camera ?
      cameraOrUuid :
      cameras.value.find((camera: Camera) => camera.uuid === cameraOrUuid)

    if (!camera) return

    const otherCameras = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
    scene.value.add(...otherCameras)
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

  scene.value.userData.tres__registerCamera = addCamera
  scene.value.userData.tres__deregisterCamera = removeCamera


  return {
    camera,
    cameras,
    addCamera,
    removeCamera,
    setCameraActive,
  }
}
