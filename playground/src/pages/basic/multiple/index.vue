<script setup lang="ts">
import Canvas1 from './Canvas1.vue'
import Canvas2 from './Canvas2.vue'
</script>

<template>
  <div class="relative">
    <div class="grid grid-cols-2">
      <div class="h-96">
        <Canvas1 />
      </div>
      <div class="h-96">
        <Canvas2 />
      </div>
    </div>
  </div>
</template>
