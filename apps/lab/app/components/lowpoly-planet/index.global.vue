<script setup lang="ts">
import { Stars } from '@tresjs/cientos'
import { PCFSoftShadowMap } from 'three'


</script>

<template>
  <TresCanvas window-size clear-color="#11101B" shadows :shadow-map-type="PCFSoftShadowMap">
    <TresPerspectiveCamera :position="[0, 1, 5]" :fov="75" :near="0.1" :far="1000" />
    <OrbitControls />
    <LowpolyPlanetThePlanet />
    <TresAmbientLight color="#484068" :intensity="3" />
    <TresPointLight color="#1BFFEF" :position="[0, 0, -8]" :intensity="80" cast-shadow />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow :shadow-mapSize="[2048, 2048]"
      :shadow-bias="0.0001" />
    <Stars :count="5000" />
    <TheScreenshot />
  </TresCanvas>
</template>
