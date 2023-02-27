<script setup lang="ts">
import Responsiveness from '/@/components/Responsiveness.vue'
</script>

<template>
  <Suspense>
    <Responsiveness />
    <!--     <VectorSetProps /> -->
  </Suspense>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}
</style>
