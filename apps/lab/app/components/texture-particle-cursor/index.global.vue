<script setup lang="ts">
// TODO: Implement experiment logic
</script>

<template>
  <TresCanvas clear-color="#181818">
    <TresPerspectiveCamera :position="[0,0,18]" />
    <!-- TODO: Add experiment scene objects -->
    <OrbitControls />
    <TextureParticleCursorExperiment />
    <TheScreenshot />
    <!-- <Teleport to="body">
      <span class="bg-red-500 w-10 h-10 absolute top-0 left-0">
        Hello Teleport
      </span>
    </Teleport> -->
  </TresCanvas>
</template>
