<script setup lang="ts">
// TODO: Implement experiment logic
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <!-- TODO: Add experiment scene objects -->
    <ParticlesMorphingExperiment />
    <OrbitControls />
    <TheScreenshot />
  </TresCanvas>
</template>
