<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[2, 2, 5]" />
    <OrbitControls />
    <TresMesh :position="[1, 1, 1]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        center
        transform
        :distance-factor="4"
        :position="[0, 0, 0.65]"
        :scale="[0.75, 0.75, 0.75]"
      >
        <h1 class="title">
          I'm a Box 📦
        </h1>
      </Html>
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight />
  </TresCanvas>
</template>
<style scoped>
.title {
  background-color: #1e1e1e;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 0.25rem;
  border-radius: 0.375rem;
}
</style>
