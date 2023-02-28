<script setup lang="ts">
import { useTweakPane } from '@tresjs/cientos'
import TheEnvironment from '/@/components/TheEnvironment.vue'
// import TheEvents from '/@/components/TheEvents.vue'

useTweakPane()
</script>

<template>
  <Suspense>
    <TheEnvironment />
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
