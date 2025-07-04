<script setup lang="ts">
import { computed } from 'vue'
import type { LechesButtonControl } from '../types'

const props = defineProps<{
  label: string
  control: LechesButtonControl
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
    :id="`${control.uniqueKey}`"
    :class="classes"
    @click="control.value.onClick"
  >
    <i
      :class="[control.value.icon, control.value.label ? 'mr-1' : '']"
    ></i>
    {{ control.value.label }}
  </button>
</template>

<style>
.leches-btn {
  @apply tl-rounded-md tl-cursor-pointer tl-border-none tl-flex tl-items-center;
  @apply tl-font-bold;
  @apply tl-transition-all tl-duration-200;
}

.leches-btn-sm {
  @apply tl-text-xs tl-px-2.5 tl-py-2;
}

.leches-btn-md {
  @apply tl-text-sm tl-px-3 tl-py-2;
}

.leches-btn-lg {
  @apply tl-text-base tl-px-4 tl-py-2;
}

.leches-btn-block {
  @apply tl-px-4 tl-py-2 tl-text-sm tl-w-full tl-justify-center;
}

.leches-btn-primary {
  @apply tl-bg-gray-100 tl-text-gray-700 dark:tl-bg-dark-400 dark:tl-text-gray-400;
}
.leches-btn-primary:hover {
  @apply tl-bg-gray-200 dark:tl-bg-dark-600;
}

.leches-btn-secondary {
  @apply tl-bg-dark-700 tl-text-light-100 dark:tl-bg-gray-100 dark:tl-text-gray-700;
}

.leches-btn-secondary:hover {
  @apply tl-bg-dark-600 dark:tl-bg-gray-300;
}
</style>
