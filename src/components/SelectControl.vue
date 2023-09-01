<script setup lang="ts">
import type { Control } from '../types'

defineProps<{
  label: string
  control: Control
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  emit('change', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="flex px-4 justify-between gap-4 items-center mb-2 min-h-32px">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <select
      :value="control.value"
      class="
        p-2
        w-2/3
        rounded
        text-left
        text-xs
        text-gray-400
        bg-gray-100
        focus:border-gray-200
        outline-none
        border-none
        font-sans
      "
      @change="onChange"
    >
      <option
        v-for="option in control.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

