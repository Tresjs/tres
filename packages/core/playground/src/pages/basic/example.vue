<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#c0ffee" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresGridHelper :size="10" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
