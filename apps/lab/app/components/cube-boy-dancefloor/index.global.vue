<script setup lang="ts">

</script>

<template>
  <TresCanvas window-size :clear-color="'#000'">
    <!-- Experiment content will go here -->
    <TresPerspectiveCamera :position="[9,9,9]" :fov="50" />
    <OrbitControls />
    <CubeBoyDancefloorCubeBoy />
    <CubeBoyDancefloorDanceFloor />
    <CubeBoyDancefloorLighting />
    <TheScreenshot />
  </TresCanvas>
  <CubeBoyDancefloorMusicPlayer />
</template>