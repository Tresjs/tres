<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import { useDark, useMouse } from '@vueuse/core'
import type { LechesNumberControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesNumberControl
}>()

const emit = defineEmits(['change'])

const controlValue = computed(() => unref(props.control.value))

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).valueAsNumber)
}

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

const mouse = useMouse()
const initialMouseX = ref(0)
const isMouseDown = ref(false)

const onInputMouseDown = (event: MouseEvent) => {
  initialMouseX.value = event.clientX
  isMouseDown.value = true
}

const onInputMouseUp = () => {
  isMouseDown.value = false
}

const calculateSpeed = (diff: number) => Math.floor(Math.abs(diff) / 10)

watch(mouse.x, (newValue) => {
  if (isMouseDown.value) {
    const diff = newValue - initialMouseX.value
    const speed = calculateSpeed(diff)
    const currentValue = controlValue.value
    if (diff > 0) {
      emit('change', currentValue + 1 + speed)
    }
    else if (diff < 0) {
      emit('change', currentValue - 1 + speed)
    }

    if (props.control.min !== undefined && currentValue < props.control.min) {
      emit('change', props.control.min)
    }

    if (props.control.max !== undefined && currentValue > props.control.max) {
      emit('change', props.control.max)
    }

    initialMouseX.value = newValue
  }
})
</script>

<template>
  <div class="tl-px-4 tl-relative tl-flex tl-gap-2 tl-justify-between tl-items-center tl-mb-2">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <div class="tl-relative tl-w-2/3 tl-flex tl-justify-between tl-items-center tl-gap-0.5">
      <input
        :value="controlValue"
        class="leches-range tl-w-1/2 tl-h-0.75 tl-bg-dark-200 dark:tl-bg-yellow tl-rounded-full tl-appearance-none"
        :style="sliderFilledStyle"
        type="range"
        :min="control.min"
        :max="control.max"
        :step="control.step"
        @input="onChange"
      />
      <input
        :value="controlValue"
        class="tl-leches-input tl-w-1/4"
        :class="{ 'tl-cursor-ew-resize': isMouseDown }"
        type="number"
        :min="control.min"
        :max="control.max"
        :step="control.step"
        @input="onChange"
        @mousedown="onInputMouseDown"
        @mouseup="onInputMouseUp"
      />
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
  height: 1rem;
  width: 0.75rem;
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
