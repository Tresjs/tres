import { PerspectiveCamera } from 'three';
import { TresCamera } from '../../types';
import { computed, watchEffect, shallowReactive, Ref } from 'vue';

export function useCamera(sizes: { height: Ref<number>, width: Ref<number>, aspectRatio: Ref<number> }) {
  const cameras = shallowReactive<TresCamera[]>([]);
  const camera = computed(() => cameras.find((camera: TresCamera) => camera.userData.IS_ACTIVE_CAMERA));

  // Camera
  function addCamera(camera: TresCamera, active = true): void {
    // Reset all cameras to inactive
    cameras.push(camera);
    if (active) {
      setCameraToActive(camera.uuid)
    }
  }

  function setCameraToActive(cameraId: string): void {
    const camera = cameras.find((camera: TresCamera) => camera.uuid === cameraId);
    if (!camera) return;

    cameras.forEach((camera: TresCamera) => camera.userData.IS_ACTIVE_CAMERA = false);
    camera.userData.IS_ACTIVE_CAMERA = true;
  }

  function clearCameras(): void {
    cameras.splice(0, cameras.length);
  }

  watchEffect(() => {
    if (sizes.aspectRatio?.value) {
      console.log('camera watcher aspectRatio', sizes.aspectRatio.value)
      cameras.forEach((camera: TresCamera) => {
        if (camera instanceof PerspectiveCamera) {
          camera.aspect = sizes.aspectRatio.value;
        }
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