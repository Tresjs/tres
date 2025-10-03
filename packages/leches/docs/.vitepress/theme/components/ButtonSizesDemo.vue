<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { ref } from 'vue'

const value = ref('Click a button')
// const size = ref('sm')
const uuid = 'button-sizes'
useControls({
  sm: {
    label: 'Small',
    type: 'button',
    size: 'sm',
    onClick: () => {
      value.value = 'Size: sm'
    },
  },
  md: {
    label: 'Medium',
    type: 'button',
    size: 'md',
    onClick: () => {
      value.value = 'Size: md'
    },
  },
  lg: {
    label: 'Large',
    type: 'button',
    size: 'lg',
    onClick: () => {
      value.value = 'Size: lg'
    },
  },
  block: {
    label: 'Block',
    type: 'button',
    size: 'block',
    onClick: () => {
      value.value = 'Size: block'
    },
  },
}, {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4">
      <pre class="bg-dark p-8 rounded text-white">{{ value }}</pre>
    </div>
    <div class="relative w-280px min-h-200px">
      <TresLeches
        class="important-left-0 -important-top-8"
        :uuid="uuid"
      />
    </div>
  </div>
</template>
