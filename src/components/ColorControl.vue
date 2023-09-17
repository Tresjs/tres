<script setup lang="ts">
import type { Control } from '../types'

defineProps<{
  label: string
  control: Control
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).value)
}
</script>

<template>
  <div class="flex px-4 justify-between gap-4 items-center mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input
      :id="`input-${label}`"
      tabindex="0"
      :value="control.value"
      :aria-label="label"
      class="focus:outline-none focus:ring-2 focus:ring-blue-600"
      :class="{ 'important-outline-gray-200': control.value === '#ffffff' }"
      type="color"
      @input="onChange"
    >
    <input
      :id="`input-${label}`"
      tabindex="0"
      :aria-label="label"
      :value="control.value"
      class="
        p-2 
        w-2/3
        rounded
        text-right
        text-xs
        text-gray-400
        bg-gray-100
        border-none
        font-sans
      "
      type="text"
      @input="onChange"
    >
  </div>
</template>

<style focus>
input[type='color'] {
  @apply appearance-none p-0  bg-transparent rounded-sm outline-none border-none box-border;
  cursor: pointer;
}

input[type='color']::-webkit-color-swatch-wrapper {
  @apply p-0 border-none;
}

input[type='color']::-webkit-color-swatch {
  @apply p-0 h-30px -mt-0.5 w-30px rounded-sm border-none;
}
</style>
