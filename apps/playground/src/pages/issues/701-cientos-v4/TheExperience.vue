<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls, Sparkles, TorusKnot } from '@tresjs/cientos'
</script>

<template>
  <TresPerspectiveCamera />
  <OrbitControls />
  <TorusKnot :scale="0.5" :args="[1, 0.35, 128, 32]">
    <TresMeshBasicMaterial color="black" />
    <Sparkles />
  </TorusKnot>
</template>
