<script setup>
import { PerspectiveCamera, Vector4, Vector3 } from 'three'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

// Make these reactive for proper responsiveness
const WIDTH = computed(() => (width.value / 4) * window.devicePixelRatio)
const HEIGHT = computed(() => (height.value / 4) * window.devicePixelRatio)
const ASPECT_RATIO = computed(() => width.value / height.value)

// Create reactive cameras that update with window size
const cameras = computed(() => {
  const cameraOptions = [
    {
      viewPort: new Vector4(Math.floor(0), Math.floor(0), Math.ceil(WIDTH.value * 2), Math.ceil(HEIGHT.value * 2)),
      position: new Vector3(15, 0, 3),
      factor: 0.4,
      name: 'left_bottom',
    },
    {
      viewPort: new Vector4(Math.floor(WIDTH.value), Math.floor(0), Math.ceil(WIDTH.value * 2), Math.ceil(HEIGHT.value * 2)),
      position: new Vector3(0, 0, -3),
      factor: 2,
      name: 'center_bottom',
    },
    {
      viewPort: new Vector4(Math.floor(WIDTH.value * 2), Math.floor(0), Math.ceil(WIDTH.value * 2), Math.ceil(HEIGHT.value * 2)),
      position: new Vector3(-15, 0, 3),
      factor: 0.4,
      name: 'right_bottom',
    },
    {
      viewPort: new Vector4(Math.floor(WIDTH.value - 75), Math.floor(HEIGHT.value), Math.ceil(WIDTH.value * 2.5), Math.ceil(HEIGHT.value * 2.5)),
      position: new Vector3(0, 0, 3),
      factor: 2,
      name: 'center_top',
    },
  ]

  return cameraOptions.map((data) => {
    const currentCam = new PerspectiveCamera(40, ASPECT_RATIO.value, 0.1, 10)
    currentCam.name = data.name
    currentCam.viewport = data.viewPort
    currentCam.position.set(...data.position)
    currentCam.position.multiplyScalar(data.factor)
    currentCam.lookAt(0, 0, 0)
    currentCam.updateMatrixWorld()
    return currentCam
  })
})
</script>

<template>
  <TresCanvas window-size clear-color="#82DBC5">
    <TresArrayCamera :args="[cameras]" :position="[0, 2, 5]" />
    <ArrayCamerasKnightRigged />
    <TresAmbientLight :color="0xffffff" :intensity="1" />
    <TresDirectionalLight :color="0xffffff" :intensity="3" />
    <TresHemisphereLight />
    <TresAxesHelper :size="5" />
    <TheScreenshot />
  </TresCanvas>
</template>
