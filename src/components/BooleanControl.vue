<script setup lang="ts">
defineProps<{
  label: string
  control: Control
}>()
</script>
<template>
  <div class="flex justify-start gap-2 items-start mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input :id="control.label" v-model="control.value" class="hidden" type="checkbox" />
    <label :for="control.label" class="inline-flex items-center cursor-pointer">
      <span
        :class="{ 'bg-dark-500': control.value, 'bg-gray-200': !control.value }"
        class="w-4 h-4 flex justify-center items-center rounded border border-gray-300 mr-2 transition-colors duration-200"
      >
        <i v-show="control.value" class="i-ic:baseline-check text-light"></i
      ></span>
    </label>
  </div>
</template>
