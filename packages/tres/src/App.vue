<script setup lang="ts">
import { TresMesh, TresSphereGeometry, TresMeshBasicMaterial, TresPerspectiveCamera } from '../.tres/components/'
import { TresCanvas } from '/@/components/TresCanvas'
</script>

<template>
  <Suspense>
    <TresCanvas clear-color="teal">
      <TresPerspectiveCamera :position="[0, 3, 3]" />
      <TresMesh>
        <TresSphereGeometry :args="[1, 1, 32, 32]" />
        <TresMeshBasicMaterial color="gold" />
      </TresMesh>
    </TresCanvas>
  </Suspense>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}
</style>
