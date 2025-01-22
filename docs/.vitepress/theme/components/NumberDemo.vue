<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'number'
const { stars } = useControls({
  stars: 100,
}, {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 dark:bg-dark-800 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4">
      <pre class="bg-dark p-8 rounded text-white">{{ stars }} ⭐️</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
