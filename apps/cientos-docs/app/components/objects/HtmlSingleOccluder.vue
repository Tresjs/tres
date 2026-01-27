<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ref } from 'vue'

const gl = {
  clearColor: '#82DBC5',
}

const sphereRef = ref(null)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 8]" />
    <OrbitControls />
    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        center
        transform
        :occlude="[sphereRef]"
        :distance-factor="4"
        :z-index-range="[28, 0]"
      >
        <h1 class="box">Move camera</h1>
      </Html>
    </TresMesh>
    <TresMesh ref="sphereRef" :position="[3, 1, 1]">
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<style scoped>
.box {
  background-color: #1e1e1e;
  color: #ffffff;
  font-size: 1.5rem;
  padding: 0.25rem;
  border-radius: 0.375rem;
}
</style>
