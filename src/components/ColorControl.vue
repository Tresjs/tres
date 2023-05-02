<script setup lang="ts">
defineProps<{
  label: string
  control: Control
}>()
</script>
<template>
  <div class="flex justify-between gap-4 items-center mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input v-model="control.value" type="color" />
    <input
      v-model="control.value"
      class="p-2 w-2/3 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
      type="text"
    />
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
