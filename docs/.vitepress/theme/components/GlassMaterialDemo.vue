<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { TresCanvas, useTexture } from '@tresjs/core'
import { OrbitControls, MeshGlassMaterial } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

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
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh :position-x="0">
      <TresTorusKnotGeometry :args="[1, 0.4, 256, 20]" />
      <MeshGlassMaterial />
    </TresMesh>
    <TresMesh
      :position="[0, 0, -1]"
    >
      <TresPlaneGeometry :args="[5, 5]" />
      <TresMeshBasicMaterial :color="0xff1111" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[2, 2, 2]"
    />
    <OrbitControls />
  </TresCanvas>
</template>
