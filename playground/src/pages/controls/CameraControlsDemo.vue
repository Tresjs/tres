<!-- eslint-disable no-console -->
<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { CameraControls, useTweakPane } from '@tresjs/cientos'
import { MathUtils, BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

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

const controlsRef = shallowRef()
const boxMeshRef = shallowRef()

const { pane } = useTweakPane()

const distanceFolder = pane.addFolder({ title: 'Distance' })
distanceFolder.addInput(controlsState, 'minDistance', {
  step: 0.01,
  min: 0,
  max: 10,
})
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

// Basic example from https://yomotsu.github.io/camera-controls/examples/basic.html
const dollyFolder = pane.addFolder({ title: 'Dolly' })
dollyFolder.addButton({ title: 'Increment (+1)' }).on('click', () => {
  controlsRef?.value?.value?.dolly(1, true)
})
dollyFolder.addButton({ title: 'Decrement (-1)' }).on('click', () => {
  controlsRef?.value?.value?.dolly(-1, true)
})

const rotateFolder = pane.addFolder({ title: 'Rotate' })
rotateFolder.addButton({ title: 'Rotate theta 45°' }).on('click', () => {
  controlsRef?.value?.value?.rotate(45 * MathUtils.DEG2RAD, 0, true)
})
rotateFolder.addButton({ title: 'Rotate theta -90°' }).on('click', () => {
  controlsRef?.value?.value?.rotate(-90 * MathUtils.DEG2RAD, 0, true)
})
rotateFolder.addButton({ title: 'Rotate theta 360°' }).on('click', () => {
  controlsRef?.value?.value?.rotate(360 * MathUtils.DEG2RAD, 0, true)
})
rotateFolder.addButton({ title: 'Rotate phi 20°' }).on('click', () => {
  controlsRef?.value?.value?.rotate(0, 20 * MathUtils.DEG2RAD, true)
})

const moveFolder = pane.addFolder({ title: 'Move' })
moveFolder.addButton({ title: 'Fit to the bounding box of the mesh' }).on('click', () => {
  controlsRef?.value?.value?.fitToBox(boxMeshRef.value, true)
})

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
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <CameraControls
      v-bind="controlsState"
      ref="controlsRef"
      make-default
      @change="onChange"
      @start="onStart"
      @end="onEnd"
    />
    <TresGridHelper :position="[0, -1, 0]" />
    <TresMesh ref="boxMeshRef">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshBasicMaterial
        color="orange"
        wireframe
      />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
