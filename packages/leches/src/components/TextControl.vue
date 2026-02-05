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
  <div class="tl-flex tl-px-4 tl-gap-1 tl-justify-start  tl-items-center tl-mb-2 tl-min-h-32px">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <input
      :id="control.uniqueKey"
      :value="controlValue"
      type="text"
      tabindex="0"
      class="tl-leches-input tl-w-2/3"
      :aria-label="label"
      placeholder="Enter value here..."
      @change="onChange"
    />
  </div>
</template>
