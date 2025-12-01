<script setup lang="ts">
</script>

<template>
  <div class="w-full relative rounded-lg overflow-hidden">
    <ClientOnly>
      <slot></slot>
    </ClientOnly>
  </div>
</template>
