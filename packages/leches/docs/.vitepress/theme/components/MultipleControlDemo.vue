<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'multiple'
const controls = useControls({
  pepe: true,
  slider: {
    min: 0,
    max: 100,
    value: 50,
  },
}, {
  uuid,
})
</script>

<template>
  <div class="w-full min-h-300px bg-gray-200 dark:bg-dark-800 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4">
      <pre class="leches-demo-preview">{{ controls }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
