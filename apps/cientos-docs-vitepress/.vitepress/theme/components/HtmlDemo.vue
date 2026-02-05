<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const gl = {
  clearColor: '#82DBC5',
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 8]" />
    <OrbitControls />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshNormalMaterial />

      <Html
        center
        transform
        :z-index-range="[28, 0]"
        :position="[0, 0, 1]"
        :scale="[0.65, 0.65, 0.65]"
      >
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          I'm an HTML Box 📦
        </h1>
      </Html>
    </TresMesh>

    <TresAmbientLight />
  </TresCanvas>
</template>