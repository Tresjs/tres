<script setup lang="ts">
const gl = {
  clearColor: '#e4e4e4',
  shadows: true,
  alpha: true,
}

</script>

<template>
  <TresLeches />
  <TresCanvas window-size v-bind="gl">
    <GlassMaterialExperience />
    <TheScreenshot />
  </TresCanvas>
</template>
