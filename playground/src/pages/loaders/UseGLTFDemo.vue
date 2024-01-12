<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { CameraControls } from '@tresjs/cientos'
import ModelsDemo from '../../components/ModelsDemo.vue'

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
    <CameraControls />
    <Suspense>
      <ModelsDemo />
    </Suspense>
    <TresMesh
      :rotate-x="Math.PI * -0.5"
      :position-y="-2"
      receive-shadow
    >
      <TresPlaneGeometry :args="[40, 40]" />
      <TresMeshStandardMaterial :color="0xf7f7f7" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      cast-shadow
      :position="[0, 10, 0]"
    />
  </TresCanvas>
</template>
