<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 8]" />
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
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          I'm a Box 📦
        </h1>
      </Html>
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight />
  </TresCanvas>
</template>
