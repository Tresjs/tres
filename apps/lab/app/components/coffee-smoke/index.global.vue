<script setup lang="ts">
// TODO: Implement experiment logic
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[8, 10, 10]" :look-at="[0, 2, 0]" />
    <OrbitControls :target="[0, 2, 0]" />
    <CoffeeSmokeExperiment />
    <!-- TODO: Add experiment scene objects -->
    <TheScreenshot />
  </TresCanvas>
</template>
