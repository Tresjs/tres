<script setup lang="ts">
defineProps<{
  label: string
  control: Control
}>()

const emit = defineEmits(['change'])

function onChange(value: string) {
  emit('change', value)
}
</script>
<template>
  <div class="flex justify-between gap-4 items-center mb-2 min-h-32px">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input
      :value="control.value"
      @change="onChange"
      class="p-2 w-2/3 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
      type="string"
    />
  </div>
</template>
