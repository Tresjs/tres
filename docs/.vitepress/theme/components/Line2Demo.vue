<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Line2 } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas v-bind="{ clearColor: '#4f4f4f' }">
    <Line2
      :points="[[-0.5, 0, 0], [0.5, 0, 0], [0, 0.8660, 0], [-0.5, 0, 0]]"
      :line-width="10"
      color="#82dbc5"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
