<script setup lang="ts">
import TheCanvas from './components/TheCanvas.vue'
import TheScene from './components/TheScene.vue'
import { TresMesh, TresBoxGeometry, TresMeshToonMaterial, TresFog } from '../.tres/components/'
</script>

<template>
  <TheCanvas>
    <TheScene>
      <TresFog :color="0x008080" :near="0" :far="100" />
      <TresMesh>
        <TresBoxGeometry :args="[4, 4]" />
        <TresMeshToonMaterial />
      </TresMesh>
    </TheScene>
  </TheCanvas>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
