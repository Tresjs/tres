<script lang="ts" setup>
import { Icosahedron, OrbitControls } from '@tresjs/cientos'

import { TresCanvas } from '@tresjs/core'
import {
  AgXToneMapping,
  PCFSoftShadowMap,
  SRGBColorSpace,
} from 'three'

const gl = {
  shadows: true,
  physicallyCorrectLights: true,
  gammaFactor: 2.2,
  gammaOutput: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: AgXToneMapping,
  toneMappingExposure: 2.2,
  shadowMapType: PCFSoftShadowMap,
  antialias: true,
}
</script>

<template>
  <TresCanvas clear-color="#ccc" v-bind="gl" window-size preset="realistic">
    <!-- <StatsGl /> -->
    <TresPerspectiveCamera :position="[0, 0, 15]" :args="[45, 1, 0.1, 1000]" />
    <OrbitControls />
    <TresDirectionalLight
      :intensity="0.4"
      :position="[30, 20, 10]"
      :color="0xFFFFFF"
      :bias="-0.0001"
    />
    <TresDirectionalLight
      :intensity="0.4"
      :position="[-30, -20, 40]"
      :color="0xFFFFFF"
      :bias="-0.0001"
      castShadow
    />
    <TresHemisphereLight :intensity="1" :color="0xFFFFFF" :ground-color="0xFFFFFF" />
    >
    <Icosahedron :args="[4, 150]" :position="[0, 0, 0]" :rotation="[Math.PI, 0, 0]">
      <TresMeshNormalMaterial wireframe />
    </Icosahedron>
  </TresCanvas>
</template>
