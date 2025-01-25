<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'getting-started'
const controls = useControls({
  pepe: true,
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  },
  color: '#008080',
}, {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px p-4 bg-gray-200 dark:bg-dark-800 mb-8 relative flex items-center">
    <pre>{{ controls }}</pre>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
