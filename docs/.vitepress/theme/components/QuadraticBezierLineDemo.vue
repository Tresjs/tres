<script setup lang="ts">
import { OrbitControls, QuadraticBezierLine } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#4f4f4f">
    <QuadraticBezierLine
      :start="[-1, 0, 0]"
      :end="[1, 2, 0]"
      :line-width="10"
      color="#fbb03b"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
