<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import TresCanvas from './components/TresCanvas'
import { useRenderLoop, useTres } from '/@/composables'
import { extend } from './core/catalogue'
// import TheEvents from '/@/components/TheEvents.vue'
const gl = {
  antialias: true,
  alpha: true,
  shadows: true,
  clearColor: '#82DBC5',
}

const { state } = useTres()

extend({ OrbitControls })

const { onLoop } = useRenderLoop()

watchEffect(() => {
  if (state.camera && state.renderer) {
    /*  controls = new OrbitControls(state.camera, state.renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.screenSpacePanning = false
    controls.minDistance = 1
    controls.maxDistance = 500
    controls.maxPolarAngle = Math.PI / 2 */
  }
})

/* onLoop(() => {
  if (controls) {
    controls.update()
  }
}) */

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
    <TresOrbitControls v-if="state.camera" :args="[state.camera, state.renderer.domElement]" />
    <TresAmbientLight :color="0xffffff" :intensity="0.75" />
    <TresDirectionalLight :color="0xffffff" :intensity="2" :position="[-2, 2, 0]" cast-shadow />
    <TresMesh :position="[0, 3, 0]" @click="click" @pointer-enter="enter" cast-shadow>
      <TresSphereGeometry :args="[1, 32, 16]"></TresSphereGeometry>
      <TresMeshToonMaterial color="teal"></TresMeshToonMaterial>
    </TresMesh>
    <TresMesh :position="[0, 0, 0]" receive-shadow :rotation-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[12, 12, 100, 100]"></TresPlaneGeometry>
      <TresMeshToonMaterial color="gray"></TresMeshToonMaterial>
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
