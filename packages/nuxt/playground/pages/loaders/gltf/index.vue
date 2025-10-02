<script setup lang="ts">
</script>

<template>
  <TresCanvas clear-color="#040404">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 1, 0]"
    />

    <NuxtStones />
    <OrbitControls />
  </TresCanvas>
</template>
