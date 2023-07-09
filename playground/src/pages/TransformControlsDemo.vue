<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, TransformControls, useTweakPane } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef = ref()
const sphereRef = ref()

const transformRef = ref()

function changeObject(object: any) {
  transformRef.value = object
}

const context = ref()

const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  space: 'world',
  axis: 'XYZ',
  size: 1,
  showX: true,
  showY: true,
  showZ: true,
})

const { pane } = useTweakPane()

pane
  .addBlade({
    view: 'list',
    label: 'Mode',
    options: [
      { text: 'Translate', value: 'translate' },
      { text: 'Rotate', value: 'rotate' },
      { text: 'Scale', value: 'scale' },
    ],
    value: controlsState.mode,
  })
  .on('change', (e: any) => {
    controlsState.mode = e.value
  })

pane.addInput(controlsState, 'enabled')

pane
  .addBlade({
    view: 'list',
    label: 'Space',
    options: [
      { text: 'World', value: 'world' },
      { text: 'Local', value: 'local' },
    ],
    value: controlsState.space,
  })
  .on('change', (e: any) => {
    controlsState.space = e.value
  })

pane.addBlade({
  view: 'list',
  label: 'Axis',
  options: [
    { text: 'X', value: 'X' },
    { text: 'Y', value: 'Y' },
    { text: 'Z', value: 'Z' },
    { text: 'XY', value: 'XY' },
    { text: 'YZ', value: 'YZ' },
    { text: 'XZ', value: 'XZ' },
    { text: 'XYZ', value: 'XYZ' },
  ],
  value: controlsState.axis,
})

pane.addInput(controlsState, 'size', {
  step: 0.01,
  min: 0,
  max: 10,
})

pane.addInput(controlsState, 'showX')
pane.addInput(controlsState, 'showY')
pane.addInput(controlsState, 'showZ')
</script>

<template>
  <TresCanvas v-bind="gl" ref="context">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls make-default />

    <TresMesh ref="boxRef" :position="[-2, 1, 0]" @click="changeObject(boxRef)">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TransformControls v-if="transformRef" :object="transformRef" v-bind="controlsState" />
    <TresMesh ref="sphereRef" :position="[2, 1, 0]" @click="changeObject(sphereRef)">
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresGridHelper />
  </TresCanvas>
</template>
