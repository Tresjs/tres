<script setup lang="ts">
defineProps<{ url: string }>()
</script>

<template>
  <iframe
    :src="url"
    class="w-full my-16 rounded shadow-lg outline-none border-none aspect-4/3"
  ></iframe>
</template>
