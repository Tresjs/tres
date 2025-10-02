<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, ScreenSizer } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#3f3f3f">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <ScreenSizer>
      <TresMesh>
        <TresBoxGeometry :args="[100, 100, 100]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSizer>
    <TresMesh :position-x="5">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
