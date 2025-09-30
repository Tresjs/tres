<script setup lang="ts">
import { OrbitControls, Sparkles, TorusKnot } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <TorusKnot :args="[1, 0.25, 128, 16]">
      <TresMeshBasicMaterial color="#222" />
      <Sparkles />
    </TorusKnot>
    <OrbitControls />
  </TresCanvas>
</template>
