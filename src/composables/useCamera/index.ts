import { computed, watchEffect, onUnmounted, ref } from 'vue'
import { Camera, OrthographicCamera, PerspectiveCamera } from 'three'

import type { TresScene } from '../../types'
import type { TresContext } from '../useTresContextProvider'

export const useCamera = ({ sizes, scene }: Pick<TresContext, 'sizes'> & { scene: TresScene }) => {

  // the computed does not trigger, when for example the camera position changes
  const cameras = ref<Camera[]>([])
  const camera = computed<Camera | undefined>(
    () => cameras.value[0],
  )

  const registerCamera = (newCamera: Camera, active = false) => {
    if (cameras.value.some(({ uuid }) => uuid === newCamera.uuid))
      return

    if (active)
      setCameraActive(newCamera)
    else
      cameras.value.push(newCamera)

  }

  const deregisterCamera = (camera: Camera) => {
    cameras.value = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
  }

  const setCameraActive = (cameraOrUuid: string | Camera) => {
    const camera = cameraOrUuid instanceof Camera
      ? cameraOrUuid
      : cameras.value.find((camera: Camera) => camera.uuid === cameraOrUuid)

    if (!camera) return

    const otherCameras = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
    cameras.value = [camera, ...otherCameras]
  }

  watchEffect(() => {
    if (sizes.aspectRatio.value) {
      cameras.value.forEach((camera: Camera) => {
        if (camera instanceof PerspectiveCamera)
          camera.aspect = sizes.aspectRatio.value

        if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera)
          camera.updateProjectionMatrix()
      })
    }
  })

  onUnmounted(() => {
    cameras.value = []
  })

  return {
    camera,
    cameras,
    registerCamera,
    deregisterCamera,
    setCameraActive,
  }
}