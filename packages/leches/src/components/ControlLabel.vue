<script setup lang="ts">
import type { Control } from '../types'

defineProps<{
  label: string
  control: Control
}>()
</script>

<template>
  <label
    :for="control.uniqueKey"
    :title="label"
    class="tl-text-gray-500 tl-w-1/3 tl-truncate"
  >
    <i
      v-if="control.icon"
      :class="control.icon"
    ></i>
    <template v-else>{{ label }}</template>
  </label>
</template>
