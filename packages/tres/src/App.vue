<script setup lang="ts">
import TresCanvas from './components/TresCanvas'
// import TheEvents from '/@/components/TheEvents.vue'
const gl = {
  antialias: true,
  alpha: true,
  clearColor: '#82DBC5',
}
function click(e) {
  console.log('click', e)
}
</script>

<template>
  <Suspense>
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :args="[75, 1, 0.1, 1000]" :position="[0, 2, 7]"></TresPerspectiveCamera>
      <TresGridHelper :args="[4, 4]"></TresGridHelper>
      <TresMesh @click="click">
        <TresBoxGeometry :args="[1, 1, 1]"></TresBoxGeometry>
        <TresMeshBasicMaterial color="teal"></TresMeshBasicMaterial>
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
}
</style>
