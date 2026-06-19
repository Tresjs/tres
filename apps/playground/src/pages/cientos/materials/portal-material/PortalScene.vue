<script setup lang="ts">
import { useLoop } from '@tresjs/core'

const torusKnot = ref()

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  if (torusKnot.value) {
    torusKnot.value.rotation.x += delta
    torusKnot.value.rotation.y += delta
  }
})
</script>

<template>
  <!-- Distinct portal background: attach lands on the private portalScene,
       NOT the main scene (it resolves against the <TresPortal> target). -->
  <TresColor attach="background" :args="[0.1, 0.1, 0.18]" />

  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[2, 4, 3]" :intensity="1.5" />

  <TresMesh ref="torusKnot" :position="[0, 0, -1]">
    <TresTorusKnotGeometry :args="[0.6, 0.25, 128, 32]" />
    <TresMeshStandardMaterial color="#fbb03b" />
  </TresMesh>

  <TresMesh :position="[0, -1.5, 0]" :rotation="[-Math.PI / 2, 0, 0]">
    <TresPlaneGeometry :args="[10, 10]" />
    <TresMeshStandardMaterial color="#1a3a5a" />
  </TresMesh>
</template>
