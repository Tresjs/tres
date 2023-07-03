import { PerspectiveCamera } from "three";
import { TresCamera } from "../types";
import { shallowRef, computed, watchEffect, ComputedRef } from "vue";

export function useCamera(sizes) {
  const cameras = shallowRef<TresCamera[]>([]);
  const camera = computed(() => cameras.value.find((camera: TresCamera) => camera.userData.IS_ACTIVE_CAMERA));

  // Camera
  function addCamera(camera: TresCamera, active = true): void {
    // Reset all cameras to inactive
    cameras.value.push(camera);
    if (active) {
      setCameraToActive(camera.uuid)
    }
  }

  function setCameraToActive(cameraId: string): void {
    const camera = cameras.value.find((camera: TresCamera) => camera.uuid === cameraId);
    if (!camera) return;

    cameras.value.forEach((camera: TresCamera) => camera.userData.IS_ACTIVE_CAMERA = false);
    camera.userData.IS_ACTIVE_CAMERA = true;
  }

  function clearCameras() {
    cameras.value = [];
  }

  watchEffect(() => {
    if (sizes.aspectRatio.value) {
      console.log('camera watcher aspectRatio', sizes.aspectRatio.value)
      cameras.value.forEach((camera: TresCamera) => {
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