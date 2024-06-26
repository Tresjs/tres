<script setup lang="ts">
// for testing purposes with auto-import disabled
// import { TresCanvas } from '#components'
</script>

<template>
  <TresCanvas window-size render-mode="on-demand">
    <TresPerspectiveCamera />
    <AnimatedDonnut color="orange" />
  </TresCanvas>
</template>
