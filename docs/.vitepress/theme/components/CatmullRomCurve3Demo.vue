<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { CatmullRomCurve3, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#4f4f4f">
    <CatmullRomCurve3
      :points="[[-1.5, 0, 0], [-0.5, 1, 0], [0.5, 0, 0], [1.5, 1, 0]]"
      :segments="40"
      :line-width="10"
      color="#fbb03b"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
