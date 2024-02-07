<script setup lang="ts">
// for testing purposes with auto-import disabled
// import { TresCanvas } from '#components'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="pink" />
    </TresMesh>
  </TresCanvas>
</template>
