<script setup lang="ts">
</script>

<template>
  <ClientOnly>
    <div
      class="relative aspect-16/9 my-8 rounded-lg overflow-hidden shadow-lg"
    >
      <Suspense>
        <slot></slot>
      </Suspense>
    </div>
  </ClientOnly>
</template>
