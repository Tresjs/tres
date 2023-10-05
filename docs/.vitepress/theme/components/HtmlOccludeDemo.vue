<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Html, OrbitControls } from '@tresjs/cientos'

const sphereRef = ref(null)
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 8]" />
    <OrbitControls />
    <TresMesh :position="[1, 1, 1]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        center
        transform
        :occlude="[sphereRef]"
        :distance-factor="4"
      >
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          Move camera
        </h1>
      </Html>
    </TresMesh>
    <TresMesh
      ref="sphereRef"
      :position="[3, 1, 1]"
    >
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
      <Html
        center
        transform
        :distance-factor="4"
      >
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          Sphere
        </h1>
      </Html>
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight />
  </TresCanvas>
</template>