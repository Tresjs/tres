<script setup lang="ts">
import { Box, PointerLockControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <Box :position-y="0.5" />
    <PointerLockControls />
    <TresGridHelper />
  </TresCanvas>
</template>
