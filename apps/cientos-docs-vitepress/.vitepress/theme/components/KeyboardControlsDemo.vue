<script setup lang="ts">
import { Box, KeyboardControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <Box :position-y="0.5" />
    <KeyboardControls />
    <TresGridHelper />
  </TresCanvas>
</template>
