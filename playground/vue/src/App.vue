<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import '@tresjs/leches/styles'

const route = useRoute()
function setBodyClass(routeName: string) {
  document.title = `Core Playground - ${routeName}`
  document.body.className = routeName
}
watch([route], () => setBodyClass(route.name?.toString() ?? ''))
provide('v-route', route)
provide('useTres', {
  message: `Im not the real useTres, but I can provide you with some data!`,
})
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>
