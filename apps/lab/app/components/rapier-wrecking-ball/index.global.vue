<script setup lang="ts">
import { PCFShadowMap } from 'three'
</script>

<template>
  <TresCanvas :shadows="PCFShadowMap" window-size clear-color="#1c1c2e" :dpr="[1, 1.5]">
    <TresPerspectiveCamera :position="[-15, 3.75, 15]" :fov="50" :near="0.1" :far="200" />
    <OrbitControls
      :target="[0, 3.75, 0]"
      :enable-pan="false"
      :min-polar-angle="Math.PI / 2"
      :max-polar-angle="Math.PI / 2"
    />
    <RapierWreckingBallTheWreckingBall />
    <TheScreenshot />
  </TresCanvas>
  <TresLeches uuid="rapier-wrecking-ball" />
</template>
