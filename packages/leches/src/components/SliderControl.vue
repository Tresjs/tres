<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMouse } from '@vueuse/core'
import type { Control } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: Control
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).valueAsNumber)
}

const sliderFilledStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right, #333 0% ${
    (100 * ((props.control.value as number) - (props.control.min || 0)))
    / ((props.control.max || 100) - (props.control.min || 0))
  }%, #e2e2e2 0%)`,
}))

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
    if (diff > 0) {
      emit('change', props.control.value + 1 + speed)
    }
    else if (diff < 0) {
      emit('change', props.control.value - 1 + speed)
    }

    if (props.control.min !== undefined && props.control.value < props.control.min) {
      emit('change', props.control.min)
    }

    if (props.control.max !== undefined && props.control.value > props.control.max) {
      emit('change', props.control.max)
    }

    initialMouseX.value = newValue
  }
})
</script>

<template>
  <div class="tl-px-4 tl-relative tl-flex tl-justify-between tl-gap-4 tl-items-center tl-mb-2">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <input
      :value="control.value"
      class="tl-w-1/2 tl-h-0.75 tl-bg-dark-200 tl-rounded-full tl-appearance-none"
      :style="sliderFilledStyle"
      type="range"
      :min="control.min"
      :max="control.max"
      :step="control.step"
      @input="onChange"
    />
    <input
      :value="control.value"
      class="
        tl-p-2
        tl-w-1/4
        tl-rounded
        tl-text-right
        tl-text-xs
        tl-text-gray-400
        tl-bg-gray-100
        tl-focus:border-gray-200
        tl-outline-none
        tl-border-none
        tl-font-sans
      "
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
</template>

<style scoped>
input[type='range'] {
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  @apply tl-h-4 tl-w-3 tl-border-2 tl-bg-dark-200 tl-rounded-sm tl-cursor-pointer tl-appearance-none tl-shadow-lg;
}

input[type='range']::-moz-range-thumb {
  @apply tl-h-4 tl-w-3 tl-border-2 tl-bg-dark-200 tl-rounded-sm tl-cursor-pointer tl-appearance-none tl-shadow-lg;
}
</style>
