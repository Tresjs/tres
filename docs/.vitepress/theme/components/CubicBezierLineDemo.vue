<script setup lang="ts">
import { CubicBezierLine, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#4f4f4f">
    <TresPerspectiveCamera :position="[0, 4, 0]" />
    <CubicBezierLine
      :start="[-1, 0, 0]"
      :end="[1, 0, 0]"
      :midA="[-1, 2, -2]"
      :midB="[1, 2, 2]"
      :line-width="10"
      color="#82dbc5"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
