<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, KeyboardControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <Box :position-y="0.5" />
    <KeyboardControls />
    <TresGridHelper />
  </TresCanvas>
</template>
