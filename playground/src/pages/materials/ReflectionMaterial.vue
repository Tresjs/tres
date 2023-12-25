<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, MeshWobbleMaterial, MeshReflectionMaterial } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { useControls, TresLeches } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { ref } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance',
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const context = ref()

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    ref="context"
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :fov="75"
      :far="1000"
    />
    <OrbitControls />
    <TresMesh :position="[0, 2, 2]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="mediumpurple" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[0, 2, 0]"
    />
    <TresMesh :position="[0, 4, 2]">
      <TresTorusGeometry />
      <MeshWobbleMaterial
        color="orange"
        :speed="2"
        :factor="1"
      />
    </TresMesh>
    <TresMesh :rotation="[-Math.PI / 2, 0, -Math.PI / 2]">
      <TresPlaneGeometry
        :args="[20, 20]"
      />
      <MeshReflectionMaterial
        :resolution="512"
        :blur="[1, 1]"
        :mirror="0.5"
      />
    </TresMesh>
  </TresCanvas>
</template>
