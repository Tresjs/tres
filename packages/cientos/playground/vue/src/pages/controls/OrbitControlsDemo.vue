<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, MOUSE, NoToneMapping, SRGBColorSpace } from 'three'
import { reactive } from 'vue'
import { useState } from '../../composables/state'
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
  switchCamera: 'orbit',
  mouseButtons: {
    LEFT: MOUSE.ROTATE,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.PAN,
  },
})

const {
  'enable Damping': enableDamping,
  dampingFactor,
  'enable Zoom': enableZoom,
  'enable Pan': enablePan,
  'enable Rotate': enableRotate,
  keyPanSpeed,
  switchCamera,
} = useControls({
  'enable Damping': controlsState.enableDamping,
  'dampingFactor': {
    value: controlsState.dampingFactor,
    step: 0.01,
    min: 0,
    max: 10,
  },
  'enable Zoom': controlsState.enableZoom,
  'enable Rotate': controlsState.enableRotate,
  'enable Pan': controlsState.enablePan,
  'keyPanSpeed': {
    value: controlsState.keyPanSpeed,
    step: 0.01,
    min: 0,
    max: 10,
  },
  'switchCamera': {
    label: 'Switch Camera',
    value: controlsState.switchCamera,
    options: ['orbit', 'firstPerson'],
  },
})

watch([enableDamping.value, dampingFactor.value, enableZoom.value, enablePan.value, keyPanSpeed.value, enableRotate.value], () => {
  controlsState.enableDamping = enableDamping.value.value
  controlsState.dampingFactor = dampingFactor.value.value
  controlsState.enableZoom = enableZoom.value.value
  controlsState.enablePan = enablePan.value.value
  controlsState.enableRotate = enableRotate.value.value
  controlsState.keyPanSpeed = keyPanSpeed.value.value
})

const {
  AnglesMaxPolarAngle,
  AnglesMinPolarAngle,
  AnglesMaxAzimuthAngle,
  AnglesMinAzimuthAngle,
} = useControls('Angles', {
  maxPolarAngle: {
    value: controlsState.maxPolarAngle,
    step: 0.01,
    min: 0,
    max: Math.PI,
  },
  minPolarAngle: {
    value: controlsState.minPolarAngle,
    step: 0.01,
    min: 0,
    max: Math.PI,
  },
  maxAzimuthAngle: {
    value: controlsState.maxAzimuthAngle,
    step: 0.01,
    min: 0,
    max: 2 * Math.PI,
  },
  minAzimuthAngle: {
    value: controlsState.minPolarAngle,
    step: 0.01,
    min: 0,
    max: 2 * Math.PI,
  },
})

watch([
  AnglesMaxPolarAngle.value,
  AnglesMinPolarAngle.value,
  AnglesMaxAzimuthAngle.value,
  AnglesMinAzimuthAngle.value,
  keyPanSpeed.value,
], () => {
  controlsState.maxPolarAngle = AnglesMaxPolarAngle.value.value
  controlsState.minPolarAngle = AnglesMinPolarAngle.value.value
  controlsState.maxAzimuthAngle = AnglesMaxAzimuthAngle.value.value
  controlsState.minAzimuthAngle = AnglesMinAzimuthAngle.value.value
})

const { DistancesMaxDistance, DistancesMinDistance } = useControls('Distances', {
  maxDistance: {
    value: controlsState.maxDistance,
    step: 0.01,
    min: 0,
    max: 100,
  },
  minDistance: {
    value: controlsState.minDistance,
    step: 0.01,
    min: 0,
    max: 100,
  },
})

watch([DistancesMaxDistance.value, DistancesMinDistance.value], () => {
  controlsState.maxDistance = DistancesMaxDistance.value.value
  controlsState.minDistance = DistancesMinDistance.value.value
})

const { ZoomEnableZoom, ZoomMinZoom, ZoomMaxZoom, ZoomZoomSpeed } = useControls('Zoom', {
  enableZoom: controlsState.enableZoom,
  minZoom: {
    value: controlsState.minZoom,
    step: 0.01,
    min: 0,
    max: 10,
  },
  maxZoom: {
    value: controlsState.maxZoom,
    step: 0.01,
    min: 0,
    max: 100,
  },
  zoomSpeed: {
    value: controlsState.zoomSpeed,
    step: 0.01,
    min: 0,
    max: 100,
  },
})

watch([ZoomEnableZoom.value, ZoomMinZoom.value, ZoomMaxZoom.value, ZoomZoomSpeed.value], () => {
  controlsState.enableZoom = ZoomEnableZoom.value.value
  controlsState.minZoom = ZoomMinZoom.value.value
  controlsState.maxZoom = ZoomMaxZoom.value.value
  controlsState.zoomSpeed = ZoomZoomSpeed.value.value
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

const { renderingTimes } = useState()

function onRender() {
  renderingTimes.value = 1
}
</script>

<template>
  <TresLeches />
  <GraphPane />
  <TresCanvas v-bind="gl" @render="onRender">
    <TresPerspectiveCamera v-if="switchCamera.value === 'orbit'" name="orbit" :position="[3, 3, 3]" />
    <TresPerspectiveCamera v-else name="firstPerson" :position="[0, 0, 3]" />
    <OrbitControls
      v-bind="controlsState"
      @change="onChange"
      @start="onStart"
      @end="onEnd"
    />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
