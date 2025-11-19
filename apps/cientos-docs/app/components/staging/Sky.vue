<script setup lang="ts">
import { OrbitControls, Sky } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas :tone-mapping-exposure="0.25">
    <TresPerspectiveCamera :position="[0, 15, 200]" />
    <Sky />
    <OrbitControls />
    <TresGridHelper :args="[1000, 20]" />
  </TresCanvas>
</template>
