<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import type { LechesNumberControl } from '../types'
import { useNumberDrag } from '../composables/useNumberDrag'
import { clampValue, defaultFormat, getInputMode } from '../utils/format'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesNumberControl
}>()

const emit = defineEmits(['change'])

const controlValue = computed(() => unref(props.control.value))
const step = computed(() => props.control.step ?? 0.1)
const formatter = computed(() => props.control.format ?? defaultFormat(step.value))
const displayValue = ref(formatter.value(controlValue.value))
const isFocused = ref(false)

const { onMouseDown, isDragging } = useNumberDrag({
  getValue: () => controlValue.value,
  step,
  min: computed(() => props.control.min),
  max: computed(() => props.control.max),
  onUpdate: v => emit('change', v),
  formatDelta: v => formatter.value(v),
})

watch(controlValue, (v) => {
  if (!isFocused.value) {
    displayValue.value = formatter.value(v)
  }
})

watch(isDragging, (dragging) => {
  if (!dragging) {
    displayValue.value = formatter.value(controlValue.value)
  }
})

function onFocus() {
  isFocused.value = true
  displayValue.value = String(controlValue.value)
}

function commit() {
  isFocused.value = false
  const parsed = Number.parseFloat(displayValue.value)
  if (Number.isNaN(parsed)) {
    displayValue.value = formatter.value(controlValue.value)
    return
  }
  emit('change', parsed)
  displayValue.value = formatter.value(parsed)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    ; (e.target as HTMLInputElement).blur()
    return
  }
  const modifier = e.shiftKey ? 10 : e.altKey ? 0.1 : 1
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const newVal = clampValue(controlValue.value + step.value * modifier, props.control.min, props.control.max)
    emit('change', newVal)
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const newVal = clampValue(controlValue.value - step.value * modifier, props.control.min, props.control.max)
    emit('change', newVal)
  }
}
</script>

<template>
  <div
    class="tl-flex tl-gap-1 tl-justify-between tl-items-center"
    style="padding: 0 var(--tl-h-padding); margin-bottom: var(--tl-unit-spacing);"
  >
    <ControlLabel :label="label" :control="control" />
    <div
      class="leches-num tl-relative tl-flex tl-items-center tl-w-2/3 tl-leches-input"
      :class="{ 'leches-num--drg': isDragging }"
    >
      <div class="leches-knob" @mousedown="onMouseDown"></div>
      <input
        :id="control.uniqueKey"
        v-model="displayValue"
        class="leches-num_i tl-leches-input tl-w-full tl-text-right"
        type="text"
        :inputmode="getInputMode(step)"
        role="spinbutton"
        :aria-valuemin="control.min"
        :aria-valuemax="control.max"
        :aria-valuenow="controlValue"
        @focus="onFocus"
        @blur="commit"
        @keydown="onKeyDown"
      />
    </div>
  </div>
</template>
