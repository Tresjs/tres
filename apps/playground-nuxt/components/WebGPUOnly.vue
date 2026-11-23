<script setup lang="ts">
// The `tres.renderer` option is global, so a /webgpu page in WebGL mode would get WebGL auto-imports
// and fail on node material tags. Show how to start the right mode instead.
const isWebGPU = useRuntimeConfig().public.tresRenderer === 'webgpu'
</script>

<template>
  <slot v-if="isWebGPU" />
  <UContainer v-else class="mt-20">
    <UAlert
      color="warning"
      variant="subtle"
      icon="i-lucide-triangle-alert"
      title="This page needs the WebGPU renderer"
      description="Stop the dev server and start it again with TRES_RENDERER=webgpu pnpm dev"
    />
  </UContainer>
</template>
