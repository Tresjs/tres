<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      :randomness="3"
      :speed="1"
      :count="2500"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
