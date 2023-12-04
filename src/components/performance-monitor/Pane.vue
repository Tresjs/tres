<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="tl-relative tl-px-4 tl-py-6 tl-grid tl-grid-cols-2 tl-border tl-border-solid tl-border-gray-300 tl-rounded tl-my-4">
    <span class="tl-absolute tl-bg-white tl-text-gray-400 tl-px-2 tl-rounded -tl-top-2 tl-left-2">{{ title }}</span>
    <slot />
  </div>
</template>