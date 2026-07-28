<script setup lang="ts">
import { Environment, Stars } from '@tresjs/cientos'
</script>

<template>
  <Stars :radius="120" :depth="40" :count="4000" />

  <!-- Night HDRI for reflections only; the background stays the dark clear color -->
  <Suspense>
    <Environment preset="shangai" :environment-intensity="0.35" />
  </Suspense>

  <TresHemisphereLight :intensity="0.35" color="#26335e" ground-color="#101c14" />
  <TresAmbientLight :intensity="0.12" color="#3a4a7a" />

  <!-- Moonlight -->
  <TresDirectionalLight :position="[6, 14, 10]" :intensity="1.4" color="#bfd0ff" cast-shadow :shadow-camera-far="120"
    :shadow-camera-top="50" :shadow-camera-bottom="-50" :shadow-camera-left="-50" :shadow-camera-right="50"
    :shadow-radius="1.5" />

  <TresDirectionalLight :position="[-6, 8, -8]" :intensity="0.5" color="#31427a" />
</template>
