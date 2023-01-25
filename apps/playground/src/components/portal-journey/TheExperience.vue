<script setup lang="ts">
import ThePortal from './ThePortal.vue'
import { OrbitControls } from '@tresjs/cientos'
import TheFireFlies from './TheFireFlies.vue'
</script>

<template>
  <Suspense>
    <TresCanvas clear-color="#201919" shadows alpha window-size power-preference="high-performance">
      <OrbitControls />
      <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
      <TresScene>
        <TresFog :args="['#201919', 0.1, 75]" />
        <ThePortal />
        <TheFireFlies />
        <TresAmbientLight :position="[10, 10, 10]" :intensity="1.5" color="#00ff00" />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
