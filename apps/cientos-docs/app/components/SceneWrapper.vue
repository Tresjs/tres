<script setup lang="ts">
// Simple wrapper for components without controls
</script>

<template>
  <div class="w-full relative rounded-lg overflow-hidden border-1 border-muted dark:border-transparent">
    <ClientOnly>
      <div class="aspect-video">
        <slot></slot>
      </div>
    </ClientOnly>
  </div>
</template>
