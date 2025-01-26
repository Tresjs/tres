<script setup lang="ts">
import type { LechesControl } from '../types'
import ControlLabel from './ControlLabel.vue'

defineProps<{
  label: string
  control: LechesControl
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  emit('change', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="tl-flex tl-px-4 tl-gap-2 tl-justify-start tl-items-center tl-mb-2 tl-min-h-32px">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <select
      :id="control.uniqueKey"
      :value="control.value"
      class="tl-leches-input tl-w-2/3"
      @change="onChange"
    >
      <option
        v-for="option in control.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
