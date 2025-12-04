<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const gl = {
  clearColor: '#82DBC5',
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[7, 2, 5]" />
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
      >
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          Move camera
        </h1>
      </Html>
    </TresMesh>
    <TresMesh
      :position="[0, 1, 2]"
    >
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
