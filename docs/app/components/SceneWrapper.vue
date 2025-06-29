<script setup lang="ts">
</script>

<template>
  <div class="w-full aspect-video rounded-lg overflow-hidden">
    <ClientOnly>
      <slot></slot>
    </ClientOnly>
  </div>
</template>
