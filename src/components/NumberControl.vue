<script setup lang="ts">
defineProps<{
  label: string
  control: Control
}>()

/* const onControlValueChange = newValue => {
  debugger
  props.control.value = parseFloat(newValue) || 0
} */
</script>
<template>
  <div class="flex justify-between gap-4 items-center mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input
      v-model="control.value"
      class="p-2 w-1/3 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
      type="number"
    />
  </div>
</template>
