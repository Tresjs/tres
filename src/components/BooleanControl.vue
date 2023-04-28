<script setup lang="ts">
defineProps<{
  label: string
  control: Control
}>()
</script>
<template>
  <div class="flex justify-start gap-2 items-start mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input
      v-model="control.value"
      class="text-left text-gray-500 bg-transparent border-b-2 border-gray-400 focus:border-gray-500"
      type="checkbox"
    />
  </div>
</template>
