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
  <div class="tl-flex tl-px-4 tl-justify-between tl-gap-4 tl-items-center tl-mb-2">
    <label class="tl-text-gray-500 tl-w-1/3">{{ label }}</label>
    <input
      :id="control.uniqueKey"
      tabindex="0"
      :value="control.value"
      :aria-label="label"
      class="focus:tl-outline-none focus:tl-ring-2 focus:tl-ring-blue-600"
      :class="{ 'important-tl-outline-gray-200': control.value === '#ffffff' }"
      type="color"
      @input="onChange"
    />
    <input
      :id="control.uniqueKey"
      tabindex="0"
      :aria-label="label"
      :value="control.value"
      class="
        tl-p-2
        tl-w-2/3
        tl-rounded
        tl-text-right
        tl-text-xs
        tl-text-gray-400
        tl-bg-gray-100
        tl-border-none
        tl-font-sans
      "
      type="text"
      @input="onChange"
    />
  </div>
</template>

<style focus>
input[type='color'] {
  @apply tl-appearance-none tl-p-0 tl-bg-transparent tl-rounded-sm tl-outline-none tl-border-none tl-box-border;
  cursor: pointer;
}

input[type='color']::-webkit-color-swatch-wrapper {
  @apply tl-p-0 tl-border-none;
}

input[type='color']::-webkit-color-swatch {
  @apply tl-p-0 tl-h-30px -tl-mt-0.5 tl-w-30px tl-rounded-sm tl-border-none;
}
</style>
