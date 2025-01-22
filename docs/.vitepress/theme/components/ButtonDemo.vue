<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { ref } from 'vue'

const value = ref('Click a button')
const uuid = 'button'
useControls({
  accept: {
    label: 'Accept',
    type: 'button',
    onClick: () => {
      value.value = 'Accept clicked'
    },
    icon: 'i-carbon-checkmark',
    size: 'sm',
  },
}, {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 dark:bg-dark-800 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4">
      <pre class="bg-dark p-8 rounded text-white">{{ value }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
