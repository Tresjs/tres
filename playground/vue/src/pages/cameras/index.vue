<script setup lang="ts">
import { Box } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { OrthographicCamera, PerspectiveCamera } from 'three'
import '@tresjs/leches/styles'
import { useWindowSize } from '@vueuse/core'

const perspectiveCamera = new PerspectiveCamera(75, 1, 0.1, 1000)
const { width, height } = useWindowSize()
const aspect = computed(() => width.value / height.value)

const frustumSize = 10
const orthographicCamera = new OrthographicCamera(
  -frustumSize * aspect.value / 2,
  frustumSize * aspect.value / 2,
  frustumSize / 2,
  -frustumSize / 2,
  0.1,
  1000,
)

orthographicCamera.zoom = 100

perspectiveCamera.position.set(8, 8, 8)
perspectiveCamera.lookAt(0, 0, 0)
orthographicCamera.position.set(8, 8, 8)
orthographicCamera.lookAt(0, 0, 0)

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

const currentCamera = computed(() => {
  return cameraType.value === 'perspective' ? perspectiveCamera : orthographicCamera
})
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
