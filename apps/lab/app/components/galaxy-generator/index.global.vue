<script setup lang="ts">
const uuid = 'galaxy-generator'

useControls('fpsgraph', {
  uuid,
})
</script>

<template>
  <ClientOnly>
    <TresLeches :uuid="uuid" collapsed />
  </ClientOnly>
  <h1
    class="title font-title text-6xl text-white fixed top-8 transform w-full text-center display-none opacity-0 z-10 pointer-events-none">
    TresJS Galaxy generator 🪐
  </h1>
  <TresCanvas :clear-color="'black'">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <GalaxyGeneratorGalaxy />
    <OrbitControls />
    <TheScreenshot />
  </TresCanvas>
</template>

<style scoped>
.title {
  font-family: 'Sacramento', cursive;
}
</style>