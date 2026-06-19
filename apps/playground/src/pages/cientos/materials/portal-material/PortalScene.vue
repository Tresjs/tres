<script setup lang="ts">
import { Environment } from '@tresjs/cientos'
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
  <!-- <Environment> here configures the PORTAL scene, not the main scene:
       MeshPortalMaterial overrides the injected scene context for its children.
       Distinct preset from the world's sunset to make the separation obvious. -->
  <Suspense>
    <Environment preset="dawn" :background="true" />
  </Suspense>

  <TresAmbientLight :intensity="0.3" />
  <TresDirectionalLight :position="[2, 4, 3]" :intensity="1.2" />

  <TresMesh ref="torusKnot" :position="[0, 0, -1]">
    <TresTorusKnotGeometry :args="[0.6, 0.25, 128, 32]" />
    <TresMeshStandardMaterial color="#fbb03b" :metalness="0.6" :roughness="0.2" />
  </TresMesh>

  <TresMesh :position="[0, -1.5, 0]" :rotation="[-Math.PI / 2, 0, 0]">
    <TresPlaneGeometry :args="[10, 10]" />
    <TresMeshStandardMaterial color="#1a3a5a" />
  </TresMesh>
</template>
