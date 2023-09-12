<script setup lang="ts">
</script>

<template>
  <ClientOnly>
    <div
      class="relative"
      style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"
    >
      <slot />
    </div> 
  </ClientOnly>
</template>