<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import KnightCharacter from './Knight.vue'
</script>

<template>
  <TresPerspectiveCamera
    :position="[3, 2, 3]"
    :look-at="[0, 1, 0]"
  />
  <OrbitControls :target="[0, 1, 0]" />
  <TresAmbientLight :intensity="1" />
  <Suspense>
    <Environment preset="sunset" background :blur="1" />
  </Suspense>
  <KnightCharacter />
  <!-- Render the animated model here -->
</template>
