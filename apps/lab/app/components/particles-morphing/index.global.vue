<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'

// TODO: Implement experiment logic
const uuid = 'particles-morphing-experiment'
useControls('fpsgraph', {
  uuid,
})
const { clearColor } = useControls({
  clearColor: '#0c0b0f',
}, {
  uuid,
})
</script>

<template>
  <ClientOnly>
    <TresLeches :uuid="uuid"/> 
  </ClientOnly>
  <TresCanvas :clear-color="clearColor" :antialias="true" :tone-mapping="ACESFilmicToneMapping">
    <TresPerspectiveCamera :position="[3.211615373355472,-0.8435919380305728,3.9967335832798145]" />
    <!-- TODO: Add experiment scene objects -->
    <ParticlesMorphingExperiment />
    <TheScreenshot />
    <OrbitControls  />
  </TresCanvas>
</template>
