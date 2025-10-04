<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

useControls('fpsgraph')
useControls({
  awiwi: true,
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  },
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 dark:bg-dark-800 mb-8 relative flex justify-center items-center">
    <TresLeches />
  </div>
</template>
