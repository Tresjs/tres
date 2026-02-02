<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import TheModel from './TheModel.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5.3, 2.45, 9.3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TheModel />
    <TresMesh
      :rotate-x="Math.PI * -0.5"
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
