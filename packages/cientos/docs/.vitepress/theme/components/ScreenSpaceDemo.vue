<script setup lang="ts">
import { OrbitControls, ScreenSpace } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera />
    <OrbitControls />
    <ScreenSpace :depth="5">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSpace>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
