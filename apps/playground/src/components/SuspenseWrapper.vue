<script setup lang="ts">
defineProps<{
  component: any
}>()

/* import Textures from './Textures.vue' */
</script>
<template>
  <pre>{{ component }}.</pre>
  <Suspense>
    <component :is="component.__name" />
  </Suspense>
</template>
