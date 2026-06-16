<script setup lang="ts">
import { PCFShadowMap } from 'three'
</script>

<template>
  <TresCanvas :shadows="PCFShadowMap" window-size clear-color="#1c1c2e" :dpr="[1, 1.5]">
    <TresPerspectiveCamera :position="[-15, 3.75, 15]" :fov="50" :near="0.1" :far="200" :look-at="[0, 3.75, 0]" />

    <Environment preset="city" background quality="4k" />
    <TresDirectionalLight
      :position="[5, 15, 10]" :intensity="1.5" cast-shadow :shadow-mapSize-width="2048"
      :shadow-mapSize-height="2048" :shadow-camera-left="-30" :shadow-camera-right="30" :shadow-camera-top="15"
      :shadow-camera-bottom="-15" :shadow-camera-near="0.1" :shadow-camera-far="80"
    />

    <RapierWreckingBallTheWreckingBall />
    <TheScreenshot />
  </TresCanvas>
  <TresLeches uuid="rapier-wrecking-ball" />
</template>
