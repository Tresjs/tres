<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas
    shadows
    alpha
    clear-color="teal"
    power-preference="high-performance"
    preserve-drawing-buffer
    physically-correct-lights
  >
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
    <TresScene>
      <OrbitControls />
      <TresAmbientLight :intensity="0.5" />
      <!--  <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" /> -->
      <TresMesh :position="[0, 0, 0]">
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresAxesHelper :args="[1]" :visible="false" />
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>
