<script setup lang="ts">
import PostProcessingManual from './PostProcessingManual.vue'
</script>
<template>
  <Suspense>
    <PostProcessingManual />
    <template #fallback>
      <div class="bg-black flex justify-center items-center w-full h-full">
        <h1 class="font-mono text-2xl text-gray-700">Loading...</h1>
      </div>
    </template>
  </Suspense>
</template>
