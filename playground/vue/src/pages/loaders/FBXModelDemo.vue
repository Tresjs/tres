<script setup lang="ts">
import { FBXModel, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

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
    <TresPerspectiveCamera :position="[5.3, 2.45, 9.3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Suspense>
      <FBXModel
        scale="0.01"
        :position="[0, -1.6, 0]"
        :rotation-y="-Math.PI * 0.5"
        cast-shadow
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx"
      />
    </Suspense>
    <TresMesh
      :rotate-x="Math.PI * -0.5"
      :position-y="-2"
      receive-shadow
    >
      <TresPlaneGeometry :args="[40, 40]" />
      <TresMeshStandardMaterial :color="0xF7F7F7" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      cast-shadow
      :position="[5, 10, 5]"
    />
  </TresCanvas>
</template>
