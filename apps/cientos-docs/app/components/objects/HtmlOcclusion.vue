<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const gl = {
  clearColor: '#82DBC5',
}
</script>

<template>
  <div class="aspect-video">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[7, 2, 3]" />
      <OrbitControls auto-rotate :auto-rotate-speed="3" />

      <TresMesh :position="[0, 1, -2]">
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
        <Html
          center
          transform
          occlude
          :distance-factor="4"
          :position="[0, 0, 2]"
          :z-index-range="[28, 0]"
        >
          <h1 class="box">Move camera</h1>
        </Html>
      </TresMesh>
      <TresMesh :position="[0, 1, 2]">
        <TresSphereGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>

      <TresGridHelper />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
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
