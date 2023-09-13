<!-- eslint-disable no-console -->
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls } from '@tresjs/cientos'
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
    <OrbitControls
      v-bind="controlsState"
      @change="onChange"
      @start="onStart"
      @end="onEnd"
    />
    <TresMesh>
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshToonMaterial
        color="orange"
      />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[0, 2, 4]"
    />
    <TresGridHelper />
  </TresCanvas>
</template>
