<script setup lang="ts">
// TODO: Implement experiment logic


</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
    <!-- TODO: Add experiment scene objects -->
    <FireworksShaderTheFireworks />
    <OrbitControls />
    <Sky :elevation="-2"  />
    <TheScreenshot />
  </TresCanvas>
</template>
