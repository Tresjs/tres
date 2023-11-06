<script setup lang="ts">
import { computed } from 'vue'
import type { Control } from '../types'

const props = defineProps<{
  label: string
  control: Control
}>()

const classes = computed(() => {
  const base = 'leches-btn'
  const variant = `leches-btn-${props.control.value.variant || 'primary'}`
  const size = `leches-btn-${props.control.value.size || 'sm'}`
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
.leches-btn {
  @apply rounded-md cursor-pointer border-none flex items-center;
  @apply font-bold;
  @apply transition-all duration-200;
}

.leches-btn-sm {
  @apply text-xs px-2.5 py-2;
}

.leches-btn-md {
  @apply text-sm px-3 py-2;
}

.leches-btn-lg {
  @apply text-base px-4 py-2;
}

.leches-btn-block {
  @apply px-4 py-2 text-base w-full justify-center;
}

.leches-btn-primary {
  @apply bg-gray-100 text-gray-700;
}
.leches-btn-primary:hover {
  @apply bg-gray-200;
}

.leches-btn-secondary {
  @apply bg-dark-700 text-light-100;
}

.leches-btn-secondary:hover {
  @apply bg-dark-600;
}
</style>