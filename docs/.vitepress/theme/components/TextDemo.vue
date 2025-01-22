<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'str'
const { message } = useControls({
  message: 'I`m a pretty penguin',
}, {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 dark:bg-dark-800 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4">
      <pre class="bg-dark p-8 rounded text-white">{{ message }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
