<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TresCanvas from './components/TresCanvas'
// import TheEvents from '/@/components/TheEvents.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <TresCanvas window-size>
      <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" :position="[0, 2, 8]" />
      <TresAmbientLight />
      <TresDirectionalLight :intensity="1" color="yellow" :position="[-2, 0, 3]" />
      <TresGridHelper :args="[4, 4]"></TresGridHelper>
      <TresMesh>
        <TresSphereGeometry :args="[2, 32, 16]" />
        <TresMeshToonMaterial color="teal" />
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
