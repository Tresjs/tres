<script setup lang="ts">
import { computed } from 'vue'
import type { Control } from '../types'

const props = defineProps<{
  label: string
  control: Control
}>()

const classes = computed(() => {
  const base = 'btn'
  const variant = `btn-${props.control.value.variant || 'primary'}`
  const size = `btn-${props.control.value.size || 'sm'}`
  return [base, variant, size]
})
</script>

<template>
  <button
    :class="classes"
    @click="control.value.onClick"
  >
    <i
      class="mr-2"
      :class="control.value.icon"
    />
    {{ control.label }}
  </button>
</template>

<style scoped>
.btn {
  @apply rounded-md cursor-pointer border-none flex items-center;
  @apply font-bold;
  @apply transition-all duration-200;
}

.btn-sm {
  @apply text-xs px-2.5 py-2;
}

.btn-md {
  @apply text-sm px-3 py-2;
}

.btn-lg {
  @apply text-base px-4 py-2;
}

.btn-block {
  @apply px-4 py-2 text-base w-full justify-center;
}

.btn-primary {
  @apply bg-gray-100 text-gray-700;
}
.btn-primary:hover {
  @apply bg-gray-200;
}

.btn-secondary {
  @apply bg-dark-700 text-light-100;
}

.btn-secondary:hover {
  @apply bg-dark-600;
}
</style>