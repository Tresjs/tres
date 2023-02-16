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
import { reactive, ref, shallowRef, watch } from 'vue'
import { OrbitControls, useTweakPane, TransformControls, Environment } from '../../../cientos/src'
import { TresCanvas } from '../core/useRenderer/component'
/* import { OrbitControls, GLTFModel } from '@tresjs/cientos' */

const state = reactive({
  shadows: true,
  alpha: true,
  physicallyCorrectLights: true,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const sphereRef = ref()

const { pane } = useTweakPane()

/* const environmentFiles = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/px.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/nx.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/py.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/ny.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/pz.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/nz.jpg',
] */

const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']

let envMap = null

const environmentTexture = shallowRef()

watch(environmentTexture, ({ getTexture }) => {
  envMap = getTexture()
})

pane.addInput(state, 'shadows', {
  label: 'Shadows',
})
pane.addInput(state, 'physicallyCorrectLights', {
  label: 'physicallyCorrectLights',
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
    state.outputEncoding = ev.value
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
    state.shadowMapType = ev.value
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
    state.toneMapping = ev.value
  })
</script>
<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[8, 8, 8]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
    <OrbitControls make-default />
    <TresScene>
      <!-- <Environment
        ref="environmentTexture"
        background
        :files="environmentFiles"
        :path="'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap'"
      /> -->
      <Environment ref="environmentTexture" background preset="sunset" />
      <TresAmbientLight :intensity="0.5" />

      <TresMesh ref="sphereRef" :position="[0, 4, 0]" cast-shadow>
        <TresSphereGeometry />
        <TresMeshStandardMaterial color="#FBB03B" :map="envMap" :metalness="1" :roughness="0" />
      </TresMesh>
      <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
      <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
        <TresPlaneGeometry :args="[10, 10, 10, 10]" />
        <TresMeshToonMaterial />
      </TresMesh>
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>
