<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Sparkles, OrbitControls, TorusKnot } from '@tresjs/cientos'
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
