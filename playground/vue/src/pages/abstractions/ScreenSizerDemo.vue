<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, ScreenSizer } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <ScreenSizer>
      <TresMesh>
        <TresBoxGeometry :args="[100, 100, 100]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSizer>
    <TresMesh :position-x="2">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
