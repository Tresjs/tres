<!-- eslint-disable no-console -->
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { reactive } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const controlsState = reactive({
  enableDamping: true,
  dampingFactor: 0.05,
  enableZoom: true,
  autoRotate: false,
  autoRotateSpeed: 2,
  maxPolarAngle: Math.PI,
  minPolarAngle: 0,
  maxAzimuthAngle: Math.PI,
  minAzimuthAngle: -Math.PI,
  enablePan: true,
  keyPanSpeed: 7,
  maxDistance: 100,
  minDistance: 0,
  minZoom: 0,
  maxZoom: 100,
  zoomSpeed: 1,
  enableRotate: true,
  rotateSpeed: 1,
})

const { pane } = useTweakPane()

pane.addInput(controlsState, 'enableDamping')
pane.addInput(controlsState, 'dampingFactor', {
  step: 0.01,
  min: 0,
  max: 10,
})
pane.addInput(controlsState, 'enableZoom')

pane.addInput(controlsState, 'enablePan')
pane.addInput(controlsState, 'keyPanSpeed', {
  step: 0.01,
  min: 0,
  max: 10,
})

const rotateFolder = pane.addFolder({ title: 'Rotate' })
rotateFolder.addInput(controlsState, 'autoRotate')
rotateFolder.addInput(controlsState, 'autoRotateSpeed', {
  step: 0.01,
  min: 0,
  max: Math.PI,
})

// Polar
const angleFolder = pane.addFolder({ title: 'Angles' })
angleFolder.addInput(controlsState, 'maxPolarAngle', {
  step: 0.01,
  min: 0,
  max: Math.PI,
})
angleFolder.addInput(controlsState, 'minPolarAngle', {
  step: 0.01,
  min: 0,
  max: Math.PI,
})
angleFolder.addInput(controlsState, 'maxAzimuthAngle', {
  step: 0.01,
  min: 0,
  max: 2 * Math.PI,
})
angleFolder.addInput(controlsState, 'minAzimuthAngle', {
  step: 0.01,
  min: 0,
  max: 2 * Math.PI,
})

const distances = pane.addFolder({ title: 'Distances' })
distances.addInput(controlsState, 'maxDistance', {
  step: 0.01,
  min: 0,
  max: 100,
})
distances.addInput(controlsState, 'minDistance', {
  step: 0.01,
  min: 0,
  max: 100,
})

const zoomFolder = pane.addFolder({ title: 'Zoom' })
zoomFolder.addInput(controlsState, 'enableZoom')
zoomFolder.addInput(controlsState, 'minZoom', {
  step: 0.01,
  min: 0,
  max: 10,
})
zoomFolder.addInput(controlsState, 'maxZoom', {
  step: 0.01,
  min: 0,
  max: 100,
})
zoomFolder.addInput(controlsState, 'zoomSpeed', {
  step: 0.01,
  min: 0,
  max: 100,
})

function onChange() {
  /* console.log('change') */
}

function onStart() {
  /*  console.log('start') */
}

function onEnd() {
  /*   console.log('end') */
}
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls v-bind="controlsState" @change="onChange" @start="onStart" @end="onEnd" />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
