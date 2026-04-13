<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import { useDark } from '@vueuse/core'
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
const isDark = useDark()

const sliderFilledStyle = computed(() => {
  const colorStart = isDark.value ? '#9ca3af' : '#2d2d2d'
  const colorEnd = isDark.value ? '#2d2d2d' : '#9ca3af'
  return {
    backgroundImage: `linear-gradient(to right, ${colorStart} 0% ${
      (100 * ((controlValue.value as number) - (props.control.min || 0)))
      / ((props.control.max || 100) - (props.control.min || 0))
    }%, ${colorEnd} 0%)`,
  }
})

watch(controlValue, (v) => {
  if (!isFocused.value) {
    displayValue.value = formatter.value(v)
  }
})

function onRangeChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).valueAsNumber)
}

const { onMouseDown, isDragging } = useNumberDrag({
  getValue: () => controlValue.value,
  step,
  min: computed(() => props.control.min),
  max: computed(() => props.control.max),
  onUpdate: v => emit('change', v),
  formatDelta: v => formatter.value(v),
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
  const clamped = clampValue(parsed, props.control.min, props.control.max)
  emit('change', clamped)
  displayValue.value = formatter.value(clamped)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    ;(e.target as HTMLInputElement).blur()
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
  <div class="tl-relative tl-flex tl-gap-2 tl-justify-between tl-items-center" style="padding: 0 var(--tl-h-padding); margin-bottom: var(--tl-unit-spacing);">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <div class="tl-relative tl-w-2/3 tl-flex tl-justify-between tl-items-center tl-gap-0.5">
      <input
        :value="controlValue"
        class="leches-range tl-w-1/2 tl-h-0.5 tl-bg-dark-200 dark:tl-bg-yellow tl-rounded-full tl-appearance-none"
        :style="sliderFilledStyle"
        type="range"
        :min="control.min"
        :max="control.max"
        :step="control.step"
        @input="onRangeChange"
      />
      <div
        class="leches-num tl-relative tl-flex tl-items-center tl-w-1/3 tl-leches-input"
        :class="{ 'leches-num--drg': isDragging }"
      >
        <div class="leches-knob" @mousedown="onMouseDown"></div>
        <input
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
  </div>
</template>

<style>
:root {
  --tl-border-color: #2d2d2d;
  --tl-thumb-bg: #2d2d2d;
}

.dark {
  --tl-border-color: #9ca3af;
  --tl-thumb-bg: #9ca3af;
}

.leches-range {
  outline: none;
  appearance: none;
  background: transparent;

  -webkit-appearance: none;
  -moz-appearance: none;
}

.leches-range::-webkit-slider-thumb {
  height: 0.75rem;
  width: 0.5rem;
  border: 2px solid var(--tl-border-color);
  --un-bg-opacity: 1;
  background-color: var(--tl-thumb-bg);
  border-radius: 0.125rem;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  --un-shadow:
    var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgb(0 0 0 / 0.1)),
    var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgb(0 0 0 / 0.1));
  box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
.leches-range::-webkit-slider-runnable-track,
.leches-range::-moz-range-track {
  appearance: none;
}
</style>
