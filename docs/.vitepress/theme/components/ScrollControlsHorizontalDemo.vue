<script setup lang="ts">
import { Box, ScrollControls, Stars } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    class="important-absolute"
    clear-color="#333"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />
    <ScrollControls horizontal />
    <Box
      :scale="0.5"
      :color="0xFF00FF"
      :position="[-1, 1, 0]"
    />
  </TresCanvas>
</template>
