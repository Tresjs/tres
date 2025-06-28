<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <iframe
    frameborder="0"
    class="w-full aspect-video border-inset-0 b-1 b-gray-500 border-opacity-50 rounded"
    src="https://playground.tresjs.org/experiments/tres-donut/"
  ></iframe>
</template>
