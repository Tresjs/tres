<script setup lang="ts">
import type { LechesControl } from '../types'

defineProps<{
  label: string
  control: LechesControl
}>()
</script>

<template>
  <label
    :for="control.uniqueKey"
    :title="label"
    class="tl-text-gray-500 dark:tl-text-gray-400 tl-w-1/3 tl-truncate"
  >
    <i
      v-if="control.icon"
      :class="control.icon"
    ></i>
    <template v-else>{{ label }}</template>
  </label>
</template>
