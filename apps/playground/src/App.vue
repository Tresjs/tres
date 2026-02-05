<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
function setBodyClass(routeName: string) {
  document.title = `TresJS Playground - ${routeName}`
  document.body.className = routeName
}
watch([route], () => setBodyClass(route.name?.toString() ?? ''))
provide('v-route', route)
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>
