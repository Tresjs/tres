<script setup lang="ts">
const gl = {
  clearColor: '#e4e4e4',
  shadows: true,
  alpha: true,
}

useControls('fpsgraph', {
  uuid: 'glass-material-experiment',
})

</script>

<template>
  <TheLoadingScreen background="#e4e4e4" text-color="#000000" />
  <ClientOnly>
    <TresLeches uuid="glass-material-experiment" />
  </ClientOnly>
  <TresCanvas window-size v-bind="gl">
    <GlassMaterialExperience />
    <TheScreenshot />
  </TresCanvas>
</template>
