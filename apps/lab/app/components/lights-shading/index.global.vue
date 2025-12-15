<script setup lang="ts">
import { NoToneMapping } from 'three'

// TODO: Implement experiment logic
useControls('fpsgraph', {
  uuid: 'lights-shading-experiment',
})
</script>

<template>
  <ClientOnly>
    <TresLeches uuid="lights-shading-experiment" />
  </ClientOnly>
  <TresCanvas :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera :position="[8,8,8]" />
    <OrbitControls />
    <!-- TODO: Add experiment scene objects -->
    <LightsShadingExperiment />
    <TheScreenshot />
  </TresCanvas>
</template>
