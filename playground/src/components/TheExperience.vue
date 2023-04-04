<script setup lang="ts">
import {
  sRGBEncoding,
  LinearEncoding,
  BasicShadowMap,
  PCFShadowMap,
  PCFSoftShadowMap,
  VSMShadowMap,
  NoToneMapping,
  LinearToneMapping,
  ReinhardToneMapping,
  CineonToneMapping,
  ACESFilmicToneMapping,
  CustomToneMapping,
} from 'three'
import { TresCanvas } from '/@/'
import { reactive, ref } from 'vue'
import { OrbitControls, useTweakPane, TransformControls } from '@tresjs/cientos'

/* import { OrbitControls, GLTFModel } from '@tresjs/cientos' */

const gl = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const sphereRef = ref()

const { pane } = useTweakPane()

pane.addInput(gl, 'clearColor', {
  label: 'Background Color',
  colorMode: 'hex',
})
pane.addInput(gl, 'shadows', {
  label: 'Shadows',
})

pane
  .addBlade({
    view: 'list',
    label: 'outputEncoding',
    options: [
      { text: 'sRGBEncoding', value: sRGBEncoding },
      { text: 'LinearEncoding', value: LinearEncoding },
    ],
    value: sRGBEncoding,
  })
  .on('change', ev => {
    gl.outputEncoding = ev.value
  })

pane
  .addBlade({
    view: 'list',
    label: 'ShadowMap Type',
    options: [
      { text: 'BasicShadowMap', value: BasicShadowMap },
      { text: 'PCFShadowMap', value: PCFShadowMap },
      { text: 'PCFSoftShadowMap', value: PCFSoftShadowMap },
      { text: 'VSMShadowMap', value: VSMShadowMap },
    ],
    value: BasicShadowMap,
  })
  .on('change', ev => {
    gl.shadowMapType = ev.value
  })

pane
  .addBlade({
    view: 'list',
    label: 'toneMapping',
    options: [
      { text: 'NoToneMapping', value: NoToneMapping },
      { text: 'LinearToneMapping', value: LinearToneMapping },
      { text: 'ReinhardToneMapping', value: ReinhardToneMapping },
      { text: 'CineonToneMapping', value: CineonToneMapping },
      { text: 'ACESFilmicToneMapping', value: ACESFilmicToneMapping },
      { text: 'CustomToneMapping', value: CustomToneMapping },
    ],
    value: NoToneMapping,
  })
  .on('change', ev => {
    console.log(ev.value)
    gl.toneMapping = ev.value
  })

const canvasRef = ref(null)

watchEffect(() => {
  if (canvasRef.value) {
    console.log(canvasRef.value)
  }
})
</script>
<template>
  <TresCanvas v-bind="gl" ref="canvasRef">
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
    <OrbitControls make-default />
    <TresAmbientLight :intensity="0.5" />
    <TransformControls mode="scale" :object="sphereRef" />

    <TresMesh ref="sphereRef" :position="[0, 4, 0]" cast-shadow>
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
  </TresCanvas>
</template>
