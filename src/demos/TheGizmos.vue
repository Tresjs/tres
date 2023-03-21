<script setup lang="ts">
import { shallowRef, shallowReactive } from 'vue'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
import { TresCanvas } from '../components/TresCanvas'
import { OrbitControls, useTweakPane, TransformControls } from '../../../cientos/src'

const state = shallowReactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  physicallyCorrectLights: true,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const transformState = shallowReactive({
  mode: 'translate',
  size: 1,
  axis: 'XY',
  showX: true,
  showY: true,
  showZ: true,
  enabled: true,
})

const boxRef = shallowRef()

const { pane } = useTweakPane()

pane
  .addBlade({
    view: 'list',
    label: 'outputEncoding',
    options: [
      { text: 'Translate', value: 'translate' },
      { text: 'Rotate', value: 'rotate' },
      { text: 'Scale', value: 'scale' },
    ],
    value: transformState.mode,
  })
  .on('change', ev => {
    transformState.mode = ev.value
  })

pane.addInput(transformState, 'size')
pane.addInput(transformState, 'enabled')

const axisFolder = pane.addFolder({ title: 'Axis' })

axisFolder
  .addBlade({
    view: 'list',
    label: 'axis',
    options: [
      { text: 'X', value: 'X' },
      { text: 'Y', value: 'Y' },
      { text: 'XY', value: 'XY' },
      { text: 'YZ', value: 'YZ' },
      { text: 'XZ', value: 'XZ' },
      { text: 'XYZ', value: 'XYZ' },
    ],
    value: transformState.axis,
  })
  .on('change', ev => {
    transformState.axis = ev.value
  })
axisFolder.addInput(transformState, 'showX')
axisFolder.addInput(transformState, 'showY')
axisFolder.addInput(transformState, 'showZ')
</script>

<template>
  <TresCanvas v-bind="state">
    <OrbitControls make-default />
    <TresPerspectiveCamera :position="[11, 11, 11]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />

    <TresMesh ref="boxRef" :position="[0, 4, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[0, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
