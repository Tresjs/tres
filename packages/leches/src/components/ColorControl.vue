<script setup lang="ts">
import { computed, unref } from 'vue'
import type { LechesControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesControl
}>()

const emit = defineEmits(['change'])

const controlValue = computed(() => unref(props.control.value))

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).value)
}
</script>

<template>
  <div class="tl-flex tl-px-4 tl-gap-1 tl-items-center tl-mb-2">
    <ControlLabel :label="label" :control="control" />
    <div class="tl-w-2/3 tl-flex tl-justify-between tl-items-center">
      <input
        :id="control.uniqueKey"
        tabindex="0"
        :value="controlValue"
        :aria-label="label"
        class="leches-color
        focus:tl-outline-none
        focus:tl-ring-2
        focus:tl-ring-gray-100
        "
        :class="{ 'important-tl-outline-gray-200': controlValue === '#ffffff' }"
        type="color"
        @input="onChange"
      />
      <input
        :id="control.uniqueKey"
        tabindex="0"
        :aria-label="label"
        :value="controlValue"
        class="tl-leches-input tl-w-1/2"
        type="text"
        @input="onChange"
      />
    </div>
  </div>
</template>

<style focus>
.leches-color {
  @apply tl-appearance-none tl-p-0 tl-bg-transparent tl-rounded-sm tl-outline-none tl-border-none tl-box-border tl-cursor-pointer;
}

.leches-color::-webkit-color-swatch-wrapper {
  @apply tl-p-0 tl-border-none;
}

.leches-color::-webkit-color-swatch {
  @apply tl-p-0 tl-h-30px -tl-mt-0.5 tl-w-30px tl-rounded-sm tl-border-none;
}
</style>
