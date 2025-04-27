<script setup lang="ts">
import { Box } from '@tresjs/cientos'
import type { TresCamera } from '@tresjs/core'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { OrthographicCamera, PerspectiveCamera } from 'three'
import '@tresjs/leches/styles'

const perspectiveCamera = new PerspectiveCamera(75, 1, 0.1, 1000)
const frustumSize = 10
const orthographicCamera = new OrthographicCamera(
  -frustumSize,
  frustumSize,
  frustumSize,
  -frustumSize,
  0.1,
  1000,
)

perspectiveCamera.position.set(8, 8, 8)
perspectiveCamera.lookAt(0, 0, 0)
orthographicCamera.position.set(8, 8, 8)
orthographicCamera.lookAt(0, 0, 0)

const currentCamera = ref<TresCamera>(perspectiveCamera)

const { cameraType } = useControls({
  cameraType: {
    value: 'perspective',
    options: [{
      text: 'Perspective',
      value: 'perspective',
    }, {
      text: 'Orthographic',
      value: 'orthographic',
    }],
  },
})

watch(cameraType, (newCameraType) => {
  if (newCameraType === 'perspective') {
    currentCamera.value = perspectiveCamera
  }
  else {
    currentCamera.value = orthographicCamera
  }
}, { immediate: true })
</script>

<template>
  <TresLeches />
  <TresCanvas
    clear-color="#82DBC5"
    :camera="currentCamera"
  >
    <Box
      :position="[0, 1, 0]"
      :scale="[2, 2, 2]"
    >
      <TresMeshNormalMaterial color="teal" />
    </Box>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
  </TresCanvas>
</template>
