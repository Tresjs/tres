import { Camera, OrthographicCamera, PerspectiveCamera } from 'three'
import { computed, ref, triggerRef, watchEffect } from 'vue'

import type { TresContext } from '../useTresContextProvider'


export const useCamera = ({ sizes, scene }: Pick<TresContext, 'sizes' | 'scene'>) => {
  const cameras = computed<Camera[]>(() => scene.value.children.filter((i): i is Camera => (i as any).isCamera))
  const activeCameraUuid = ref(cameras.value?.[0]?.uuid ?? "")
  const camera = computed<Camera | undefined>(
    () => cameras.value.find(c => c.uuid === activeCameraUuid.value) ?? cameras.value.at(0),
  )

  const addCamera = (newCamera: Camera, active = false) => {
    if (cameras.value.some(({ uuid }) => uuid === newCamera.uuid))
      return

    scene.value.add(newCamera)
    triggerRef(scene)
    if (active)
      setCameraActive(newCamera)
  }

  const removeCamera = (camera: Camera) => {
    scene.value.remove(camera)
    triggerRef(scene)
  }

  const setCameraActive = (cameraOrUuid: string | Camera) => {
    const cameraUuid = cameraOrUuid instanceof Camera ?
      cameraOrUuid.uuid :
      cameraOrUuid

    if (!cameraUuid) return

    activeCameraUuid.value = cameraUuid
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
