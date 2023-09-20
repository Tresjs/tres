<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, OrthographicCamera, PerspectiveCamera, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#2B3846',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const state = reactive({
  cameraType: 'perspective',
  camera: new PerspectiveCamera(75, 1, 0.1, 1000),
})

state.camera.position.set(5, 5, 5)
state.camera.lookAt(0, 0, 0)
const { pane } = useTweakPane()

pane
  .addBlade({
    view: 'list',
    label: 'Camera',
    options: [
      { text: 'perspective', value: 'perspective' },
      { text: 'orthographic', value: 'orthographic' },
    ],
    value: 'perspective',
  })
  .on('change', (e) => {
    state.cameraType = e.value
    const newCamera
      = e.value === 'perspective'
        ? new PerspectiveCamera(75, 1, 0.1, 1000)
        : new OrthographicCamera(-10, 10, 10, -10, 0.1, 1000)

    newCamera.position.set(5, 5, 5)
    newCamera.lookAt(0, 0, 0)
    state.camera = newCamera
    perspectiveFolder.hidden = e.value === 'orthographic'
    orthographicFolder.hidden = e.value === 'perspective'
    /* context.value.state.accio += 1 */
  })

const perspectiveFolder = pane.addFolder({
  title: 'Perspective Camera',
})

const orthographicFolder = pane.addFolder({
  title: 'Ortographic Camera',
})

orthographicFolder.hidden = true

watch(
  () => state.cameraType,
  () => {
    if (state.cameraType === 'orthographic') {
      perspectiveFolder.children.forEach((child) => {
        child.dispose()
      })
      orthographicFolder.addInput(state.camera, 'left', { min: -50, max: 50 })
      orthographicFolder.addInput(state.camera, 'right', { min: -50, max: 50 })
      orthographicFolder.addInput(state.camera, 'top', { min: -50, max: 50 })
      orthographicFolder.addInput(state.camera, 'bottom', { min: -50, max: 50 })
      orthographicFolder.addInput(state.camera, 'near', { min: 0, max: 50 })
      orthographicFolder.addInput(state.camera, 'far', { min: 0, max: 500 })
    }
    else {
      orthographicFolder.children.forEach((child) => {
        child.dispose()
      })
      perspectiveFolder.addInput(state.camera, 'fov', { min: 0, max: 180 })
      perspectiveFolder.addInput(state.camera, 'near', { min: 0, max: 10 })
      perspectiveFolder.addInput(state.camera, 'far', { min: 0, max: 100 })
    }
  },
  {
    immediate: true,
  },
)

const context = ref(null)

const asyncTorus = ref(false)

setTimeout(() => {
  asyncTorus.value = true
}, 1000)
</script>

<template>
  <TresCanvas
    v-bind="gl"
    ref="context"
    :camera="state.camera"
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
