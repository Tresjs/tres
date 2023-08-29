<script setup lang="ts">
import { Control } from '../types'

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
  <div class="flex px-4 justify-between gap-4 items-center mb-2 min-h-32px">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input
      :value="control.value"
      type="string"
      class="p-2 w-2/3 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
      @change="onChange"
    />
  </div>
</template>
