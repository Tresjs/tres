<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
function setBodyClass(routeName: string) {
  document.title = `Cientos Playground - ${routeName}`
  document.body.className = routeName
}
watch([route], () => setBodyClass(route.name?.toString() ?? ''))
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>
