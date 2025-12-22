<script setup lang="ts">
import { OrbitControls, QuadraticBezierLine } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <QuadraticBezierLine
        :start="[-1, 0, 0]"
        :end="[1, 2, 0]"
        :line-width="10"
        color="orange"
      />
      <TresGridHelper />
      <OrbitControls />
    </TresCanvas>
  </div>
</template>
