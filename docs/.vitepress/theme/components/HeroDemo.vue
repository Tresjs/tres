<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

useControls('fpsgraph', {
  uuid: 'hero'
})
useControls({
  awiwi: true,
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  }
}, {
  uuid: 'hero'
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 mb-8 relative flex justify-center items-center">
    <div class="relative w-280px min-h-200px">
      <TresLeches class="important-left-0 important-top-0" :uuid="'hero'" />
    </div>
  </div>
</template>