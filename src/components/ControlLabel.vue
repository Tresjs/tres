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
    class="text-gray-500 w-1/3 truncate"
  >
    <i
      v-if="control.icon"
      :class="control.icon"
    />
    <template v-else>{{ label }}</template>
  </label>
</template>