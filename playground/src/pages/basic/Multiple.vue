<script setup lang="ts">
import Canvas1 from './multiple/Canvas1.vue'
import Canvas2 from './multiple/Canvas2.vue'
</script>

<template>
  <div class="relative">
    <div class="grid grid-cols-2">
      <div class="max-h-96">
        <Canvas1 />
      </div>
      <div class="max-h-96">
        <Canvas2 />
      </div>
    </div>
  </div>
</template>
