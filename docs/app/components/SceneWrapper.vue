<script setup lang="ts">
</script>

<template>
  <div class="w-full relative aspect-video rounded-lg overflow-hidden">
    <ClientOnly>
      <slot />
    </ClientOnly>
  </div>
</template>
