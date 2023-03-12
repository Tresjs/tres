<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import TresCanvas from './components/TresCanvas'
import AkuAku from './demos/AkuAku.vue'
import { useRenderLoop, useTres } from '/@/composables'
// import TheEvents from '/@/components/TheEvents.vue'
const gl = {
  antialias: true,
  alpha: true,
  clearColor: '#82DBC5',
}

const { state } = useTres()
let controls = null

const { onLoop } = useRenderLoop()

watchEffect(() => {
  if (state.camera && state.renderer) {
    controls = new OrbitControls(state.camera, state.renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.screenSpacePanning = false
    controls.minDistance = 1
    controls.maxDistance = 500
    controls.maxPolarAngle = Math.PI / 2
  }
})

onLoop(() => {
  if (controls) {
    controls.update()
  }
})

const gridVisible = ref(false)
function click(e) {
  console.log('click', e)
  gridVisible.value = !gridVisible.value
}
function enter(e) {
  console.log('enter', e)
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :args="[75, 1, 0.1, 1000]" :position="[0, 2, 7]"></TresPerspectiveCamera>
    <TresAmbientLight :color="0xffffff" :intensity="0.75" />
    <TresDirectionalLight :color="0xffffff" :intensity="2" :position="[-2, 2, 0]" />
    <TresMesh :position="[0, 1, 0]" @click="click" @pointer-enter="enter">
      <TresSphereGeometry :args="[1, 32, 16]"></TresSphereGeometry>
      <TresMeshToonMaterial color="teal"></TresMeshToonMaterial>
    </TresMesh>
    <TresGridHelper :args="[4, 4]"></TresGridHelper>
  </TresCanvas>
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
