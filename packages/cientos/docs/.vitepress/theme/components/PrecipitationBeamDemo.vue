<script setup lang="ts">
import { Precipitation } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      :position="[0, 3, 7.5]"
      :randomness="0"
      :speed="0.5"
      :count="2000"
      :area="[1, 10, 1]"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
