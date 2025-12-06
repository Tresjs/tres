<script setup lang="ts">
import { Precipitation } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
