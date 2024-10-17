import type { OrthographicCamera } from 'three'
import type { TresScene } from '../../types'
import type { TresContext } from '../useTresContextProvider'

import { Camera, PerspectiveCamera } from 'three'
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { camera as isCamera } from '../../utils/is'

export const useCamera = ({ sizes }: Pick<TresContext, 'sizes'> & { scene: TresScene }) => {
  // the computed does not trigger, when for example the camera position changes
  const cameras = ref<Camera[]>([])
  const camera = computed<Camera | undefined>(
    () => cameras.value[0],
  )

  const setCameraActive = (cameraOrUuid: string | Camera) => {
    const camera = cameraOrUuid instanceof Camera
      ? cameraOrUuid
      : cameras.value.find((camera: Camera) => camera.uuid === cameraOrUuid)

    if (!camera) { return }

    const otherCameras = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
    cameras.value = [camera, ...otherCameras]
  }

  const registerCamera = (maybeCamera: unknown, active = false) => {
    if (isCamera(maybeCamera)) {
      const camera = maybeCamera
      if (cameras.value.some(({ uuid }) => uuid === camera.uuid)) { return }

      if (active) { setCameraActive(camera) }
      else { cameras.value.push(camera) }
    }
  }

  const deregisterCamera = (maybeCamera: unknown) => {
    if (isCamera(maybeCamera)) {
      const camera = maybeCamera
      cameras.value = cameras.value.filter(({ uuid }) => uuid !== camera.uuid)
    }
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
          }
          else {
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

function isOrthographicCamera(o: any): o is OrthographicCamera {
  // eslint-disable-next-line no-prototype-builtins
  return o.hasOwnProperty('isOrthographicCamera') && o.isOrthographicCamera
}
