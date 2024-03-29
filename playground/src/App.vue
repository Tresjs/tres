<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
function setBodyClass(routeName: string) {
  document.title = `Core Playground - ${routeName}`
  document.body.className = routeName
}
watch([route], () => setBodyClass(route.name?.toString() ?? ''))

function runMemoryMeasurements() {
  const interval = -Math.log(Math.random()) * 5 * 60 * 1000;
  console.log(`Next measurement in ${Math.round(interval / 1000)} seconds.`);
  setTimeout(measureMemory, interval);
}

async function measureMemory() {
  console.log(window.performance.memory);
  const entries = performance.getEntriesByType("resource");
  entries.forEach((entry) => {
      console.log(`${entry.name}: ${entry.duration}`);
  });
  runMemoryMeasurements();
}

measureMemory()



</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>
