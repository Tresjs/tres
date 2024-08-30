<!-- eslint-disable no-console -->
<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { CameraControls } from '@tresjs/cientos'
import { BasicShadowMap, MathUtils, NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const controlsState = reactive({
  distance: 5,
  minDistance: 0,
  maxDistance: 100,
})

const controlsRef = shallowRef()
const boxMeshRef = shallowRef()

function onChange() {
  console.log('change')
}

function onStart() {
  console.log('start')
}

function onEnd() {
  console.log('end')
}

const { distance, minDistance, maxDistance } = useControls({
  distance: {
    value: controlsState.distance,
    min: 0,
    max: 100,
    step: 0.01,
  },
  minDistance: {
    value: controlsState.minDistance,
    min: 0,
    max: 10,
    step: 0.01,
  },
  maxDistance: {
    value: controlsState.maxDistance,
    min: 0,
    max: 100,
    step: 0.01,
  },
})

watch([distance.value, minDistance.value, maxDistance.value], () => {
  controlsState.distance = distance.value.value
  controlsState.minDistance = minDistance.value.value
  controlsState.maxDistance = maxDistance.value.value
})

useControls(
  'Dolly',
  {
    dollyInc: {
      type: 'button',
      onClick: () => {
        controlsRef?.value?.value?.dolly(1, true)
      },
      label: 'Increment (+1)',
    },
    dollyDec: {
      type: 'button',
      onClick: () => {
        controlsRef?.value?.value?.dolly(-1, true)
      },
      label: 'Increment (-1)',
    },
  },
)

useControls(
  'Rotate',
  {
    rotateTheta45: {
      type: 'button',
      label: 'Rotate theta 45°',
      onClick: () => {
        controlsRef?.value?.value?.rotate(45 * MathUtils.DEG2RAD, 0, true)
      },
    },
    rotateTheta90: {
      type: 'button',
      label: 'Rotate theta -90°',
      onClick: () => {
        controlsRef?.value?.value?.rotate(-90 * MathUtils.DEG2RAD, 0, true)
      },
    },
    rotateTheta360: {
      type: 'button',
      label: 'Rotate theta 360°',
      onClick: () => {
        controlsRef?.value?.value?.rotate(360 * MathUtils.DEG2RAD, 0, true)
      },
    },
    rotatePhi20: {
      type: 'button',
      label: 'Rotate phi 20°',
      onClick: () => {
        controlsRef?.value?.value?.rotate(0, 20 * MathUtils.DEG2RAD, true)
      },
    },
  },
)

useControls(
  'Move',
  {
    fitToBoundingBox: {
      type: 'button',
      label: 'Fit to the bounding box of the mesh',
      onClick: () => {
        controlsRef?.value?.value?.fitToBox(boxMeshRef.value, true)
      },
    },
  },
)
</script>

<template>
  <TresLeches />
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
