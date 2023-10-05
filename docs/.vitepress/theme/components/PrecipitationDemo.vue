<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
