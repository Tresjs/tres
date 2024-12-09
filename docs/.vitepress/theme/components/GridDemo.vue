<script setup lang="ts">
import { Grid, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#222222">
    <TresPerspectiveCamera :position="[8, 10, 10]" :fov="25" />
    <OrbitControls />
    <Grid
      :args="[10.5, 10.5]"
      cell-color="#82dbc5"
      :cell-size="0.6"
      :cell-thickness="0.5"
      section-color="#fbb03b"
      :section-size="2"
      :section-thickness="1.3"
      :infinite-grid="true"
      :fade-from="0"
      :fade-distance="12"
      :fade-strength="1"
    />
  </TresCanvas>
</template>
