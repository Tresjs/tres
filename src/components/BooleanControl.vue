<script setup lang="ts">
import type { Control } from '../types'

defineProps<{
  label: string
  control: Control
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).checked)
}
</script>

<template>
  <div class="flex px-4 justify-start gap-2 items-center mb-2 min-h-32px">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input
      :id="control.label"
      :checked="control.value"
      class="hidden"
      type="checkbox"
      @input="onChange"
    >
    <label
      :for="control.label"
      class="inline-flex items-center cursor-pointer"
    >
      <span
        tabindex="0"
        :class="{ 'bg-dark-500': control.value, 'bg-gray-200': !control.value }"
        class="w-4 
          h-4 
          flex 
          justify-center 
          items-center 
          rounded 
          border 
          border-gray-300 
          mr-2 
          transition-colors 
          duration-200"
      >
        <i
          v-show="control.value"
          class="i-ic:baseline-check text-light"
        /></span>
    </label>
  </div>
</template>
