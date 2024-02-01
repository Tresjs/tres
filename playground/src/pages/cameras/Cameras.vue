<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, PerspectiveCamera, OrthographicCamera } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { Box } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
type Cam = (PerspectiveCamera | OrthographicCamera) & {manual?: boolean}

const state = reactive({
  cameraType: 'perspective',
  camera: new PerspectiveCamera(75, 1, 0.1, 1000) as Cam,
})

state.camera.position.set(5, 5, 5)
state.camera.lookAt(0, 0, 0)

const { cameraType, manual } = useControls({
  cameraType: {
    label: 'CameraType',
    options: [{
      text: 'Perspective',
      value: 'perspective',
    }, {
      text: 'Orthographic',
      value: 'orthographic',
    }
  ],
    value: state.cameraType,
  },
  manual: false
})

watch(() => [cameraType.value.value, manual.value.value], () => {
  state.cameraType = cameraType.value.value
  if (cameraType.value.value === 'perspective') {
    state.camera = new PerspectiveCamera(75, 1, 0.1, 1000)
  } else if (cameraType.value.value === 'orthographic') {
    state.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1000)
    state.camera.zoom = 20
  }
  state.camera.manual = manual.value.value
  state.camera.position.set(5, 5, 5)
  state.camera.lookAt(0, 0, 0)
})

const context = ref(null)

watchEffect(() => {
  if (context.value) {
    console.log(context.value)
  }
})

const asyncTorus = ref(false)

setTimeout(() => {
  asyncTorus.value = true
}, 1000)
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    ref="context"
    :camera="state.camera"
  >
    <!--     <TresPerspectiveCamera v-if="state.cameraType === 'perspective'" :position="[11, 11, 11]" />
    <TresOrthographicCamera v-if="state.cameraType === 'orthographic'" :position="[11, 11, 11]" /> -->
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
