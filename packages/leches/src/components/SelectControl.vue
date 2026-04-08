<script setup lang="ts">
import { computed, unref } from 'vue'
import type { LechesControl, LechesSelectOption } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesControl
}>()

const emit = defineEmits(['change'])

const controlValue = computed(() => unref(props.control.value))

function onChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value

  // Find the matching option to preserve the original type
  const selectedOption = props.control.options?.find((option: LechesSelectOption) =>
    String(option.value) === selectedValue,
  )

  // Use the original value with its correct type
  emit('change', selectedOption?.value ?? selectedValue)
}
</script>

<template>
  <div class="tl-flex tl-gap-1 tl-justify-start tl-items-center" style="padding: 0 var(--tl-h-padding); margin-bottom: var(--tl-unit-spacing); min-height: var(--tl-unit-size);">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <select
      :id="control.uniqueKey"
      :value="String(controlValue)"
      class="tl-leches-input tl-w-2/3"
      @change="onChange"
    >
      <option
        v-for="option in control.options"
        :key="String(option.value)"
        :value="String(option.value)"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
