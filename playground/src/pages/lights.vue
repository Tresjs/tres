<script setup lang="ts">
import { TresCanvas, vLightHelper } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />

    <TresMesh
      :position="[0, 4, 0]"
      cast-shadow
    >
      <TresSphereGeometry :args="[1, 32, 32]" />
      <TresMeshToonMaterial color="yellow" />
    </TresMesh>
    <TresDirectionalLight
      v-light-helper
      :position="[0, 8, 4]"
      :intensity="0.7"
      color="yellow"
      cast-shadow
    />
    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>