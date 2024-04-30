<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, ScrollControls, Stars } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
    class="important-absolute"
    clear-color="#333"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />
    <ScrollControls
      :pages="20"
      :distance="20"
      :smooth-scroll="0.05"
    />
    <Box
      :scale="0.5"
      :color="0xFF00FF"
      :position="[-1, 1, 0]"
    />
  </TresCanvas>
</template>
