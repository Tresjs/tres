<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PointMaterial } from '@tresjs/cientos'
</script>

<template>
  <div class="aspect-video">
    <TresCanvas>
      <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
      <OrbitControls />
      <TresPoints>
        <TresIcosahedronGeometry :args="[1, 4]" />
        <PointMaterial :size="5" color="orange" />
      </TresPoints>
      <TresAmbientLight />
    </TresCanvas>
  </div>
</template>
