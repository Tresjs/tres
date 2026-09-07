<script setup lang="ts">

const gl = {
  clearColor: '#12121a',
  alpha: false,
}

</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 8]" :fov="50" :look-at="[0, 0, 0]" />
    <PortalsRpgDifficultyExperience />
    <OrbitControls />
    <TheScreenshot />
  </TresCanvas>
</template>
