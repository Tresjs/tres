<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMouse } from '@vueuse/core'
import { Control } from '../types'

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
    (100 * ((props.control.value as number) - (props.control.min || 0))) /
    ((props.control.max || 100) - (props.control.min || 0))
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

const calculateSpeed = (diff: number) => {
  return Math.floor(Math.abs(diff) / 10)
}

watch(mouse.x, newValue => {
  if (isMouseDown.value) {
    const diff = newValue - initialMouseX.value
    const speed = calculateSpeed(diff)
    if (diff > 0) {
      emit('change', props.control.value + 1 + speed)
    } else if (diff < 0) {
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
  <div class="px-4 relative flex justify-between gap-4 items-center mb-2">
    <label class="text-gray-500 w-1/3" :class="{ 'flex justify-between items-center': control.icon }"
      >{{ label }} <i :class="`i-${control.icon}`"></i
    ></label>
    <input
      :value="control.value"
      class="w-1/2 h-0.75 bg-dark-200 rounded-full appearance-none"
      :style="sliderFilledStyle"
      type="range"
      :min="control.min"
      :max="control.max"
      :step="control.step"
      @input="onChange"
    />
    <input
      :value="control.value"
      class="p-2 w-1/4 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
      :class="{ 'cursor-ew-resize': isMouseDown }"
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
  @apply h-4 w-3 border-2 bg-dark-200 rounded-sm cursor-pointer appearance-none shadow-lg;
}

input[type='range']::-moz-range-thumb {
  @apply h-4 w-3 border-2 bg-dark-200 rounded-sm cursor-pointer appearance-none shadow-lg;
}
</style>
