<!-- eslint-disable no-console -->
<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { CameraControls, useTweakPane } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const controlsState = reactive({
  minDistance: 0,
  maxDistance: 100,
})

const { pane } = useTweakPane()

const distanceFolder = pane.addFolder({ title: 'Distance' })
distanceFolder.addInput(controlsState, 'minDistance', {
  step: 0.01,
  min: 0,
  max: 10,
})
distanceFolder.addInput(controlsState, 'maxDistance', {
  step: 0.01,
  min: 0,
  max: 100,
})

// TODO: replicate the panes from https://yomotsu.github.io/camera-controls/examples/basic.html

function onChange() {
  console.log('change')
}

function onStart() {
  console.log('start')
}

function onEnd() {
  console.log('end')
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <CameraControls v-bind="controlsState" @change="onChange" @start="onStart" @end="onEnd" />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
