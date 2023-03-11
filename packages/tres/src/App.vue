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
function enter(e) {
  console.log('enter', e)
}
</script>

<template>
  <Suspense>
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :args="[75, 1, 0.1, 1000]" :position="[0, 2, 7]"></TresPerspectiveCamera>
      <TresMesh :position="[0, 4, 0]" @click="click" @pointer-enter="enter">
        <TresBoxGeometry :args="[1, 1, 1]"></TresBoxGeometry>
        <TresMeshBasicMaterial color="teal"></TresMeshBasicMaterial>
      </TresMesh>
      <TresGridHelper :args="[4, 4]"></TresGridHelper>
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
