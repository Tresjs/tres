<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, MeshGlassMaterial, Box, Sphere } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const context = ref()
const glassMaterialRef = shallowRef()
const boxRef = shallowRef()

watch(glassMaterialRef, value => {
  boxRef.value.value.material.dispose()
  boxRef.value.value.material = value.MeshGlassMaterialClass
})
</script>

<template>
  <TresCanvas v-bind="gl" ref="context">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh :position-x="3">
      <TresTorusKnotGeometry :args="[1, 0.4, 256, 20]" />
      <MeshGlassMaterial ref="glassMaterialRef" />
    </TresMesh>
    <Sphere :scale="0.5">
      <MeshGlassMaterial />
    </Sphere>
    <Box ref="boxRef" :position-x="-3" />
    <TresMesh :position="[0, 0, -1]">
      <TresPlaneGeometry :args="[3, 3]" />
      <TresMeshBasicMaterial :color="0xff1111" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>
