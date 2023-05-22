<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TransformControls, OrbitControls, useTweakPane } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { shallowReactive, shallowRef } from 'vue'

const gl = {
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const transformState = shallowReactive({
  mode: 'translate',
  size: 1,
  axis: 'XY',
  showX: true,
  showY: true,
  showZ: true,
})

const boxRef = shallowRef()

const { pane } = useTweakPane()

pane
  .addBlade({
    view: 'list',
    label: 'outputColorSpace',
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
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" />
    <OrbitControls make-default />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
    <TresAxesHelper />
    <TresMesh ref="boxRef">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshToonMaterial color="teal" />
    </TresMesh>
    <TransformControls :object="boxRef" v-bind="transformState" />
  </TresCanvas>
</template>
