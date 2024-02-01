import { computed, watchEffect, onUnmounted, ref } from 'vue'
import { Camera, OrthographicCamera, PerspectiveCamera } from 'three'

import type { TresScene } from '../../types'
import type { TresContext } from '../useTresContextProvider'

export const useCamera = ({
  sizes,
  scene,
}: Pick<TresContext, 'sizes'> & { scene: TresScene }) => {
  // the computed does not trigger, when for example the camera position changes
  const cameras = ref<Camera[]>([])
  const camera = computed<Camera | undefined>(() => cameras.value[0])

  const registerCamera = (newCamera: Camera, active = false) => {
    if (cameras.value.some(({ uuid }) => uuid === newCamera.uuid)) return

    if (active) setCameraActive(newCamera)
    else cameras.value.push(newCamera)
  }

  const deregisterCamera = (camera: Camera) => {
    cameras.value = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
  }

  const setCameraActive = (cameraOrUuid: string | Camera) => {
    const camera
      = cameraOrUuid instanceof Camera
        ? cameraOrUuid
        : cameras.value.find((camera: Camera) => camera.uuid === cameraOrUuid)

    if (!camera) return

    const otherCameras = cameras.value.filter(
      ({ uuid }) => uuid !== camera.uuid,
    )
    cameras.value = [camera, ...otherCameras]
  }

  watchEffect(() => {
    if (sizes.aspectRatio.value) {
      cameras.value.forEach((camera: Camera & { manual?: boolean }) => {
        // NOTE: Don't mess with the camera if it belongs to the user.
        // https://github.com/pmndrs/react-three-fiber/blob/0ef66a1d23bf16ecd457dde92b0517ceec9861c5/packages/fiber/src/core/utils.ts#L457
        //
        // To set camera as "manual":
        // const myCamera = new PerspectiveCamera(); // or OrthographicCamera
        // (myCamera as any).manual = true
        if (!camera.manual && (camera instanceof PerspectiveCamera || isOrthographicCamera(camera))) {
          if (camera instanceof PerspectiveCamera) {
            camera.aspect = sizes.aspectRatio.value
          } else {
            camera.left = sizes.width.value * -0.5
            camera.right = sizes.width.value * 0.5
            camera.top = sizes.height.value * 0.5
            camera.bottom = sizes.height.value * -0.5
          }
          camera.updateProjectionMatrix()
        }
      })
    }
  })

  scene.userData.tres__registerCamera = registerCamera
  scene.userData.tres__deregisterCamera = deregisterCamera

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

function isOrthographicCamera(o:any): o is OrthographicCamera {
  return o.hasOwnProperty('isOrthographicCamera') && o.isOrthographicCamera
}