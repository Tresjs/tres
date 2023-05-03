<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  label: string
  control: Control
}>()

const sliderFilledStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right, #333 0% ${
    (100 * ((props.control.value as number) - props.control.min)) / (props.control.max - props.control.min)
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
      props.control.value += 1 + speed
    } else if (diff < 0) {
      props.control.value -= 1 + speed
    }

    if (props.control.min !== undefined && props.control.value < props.control.min) {
      props.control.value = props.control.min
    }

    if (props.control.max !== undefined && props.control.value > props.control.max) {
      props.control.value = props.control.max
    }

    initialMouseX.value = newValue
  }
})
</script>
<template>
  <div class="relative flex justify-between gap-4 items-center mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input
      v-model="control.value"
      class="w-1/2 h-0.75 bg-dark-200 rounded-full appearance-none"
      :style="sliderFilledStyle"
      type="range"
      :min="control.min"
      :max="control.max"
      :step="control.step"
    />
    <input
      v-model="control.value"
      class="p-2 w-1/4 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
      :class="{ 'cursor-ew-resize': isMouseDown }"
      type="number"
      :min="control.min"
      :max="control.max"
      :step="control.step"
      @mousedown="onInputMouseDown"
      @mouseup="onInputMouseUp"
    />
  </div>
</template>

<style scoped>
input[type='range'] {
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  @apply h-4 w-3 border-2 bg-dark-200 rounded-sm cursor-pointer appearance-none shadow-lg;
}

input[type='range']::-moz-range-thumb {
  @apply h-4 w-3 border-2 bg-dark-200 rounded-sm cursor-pointer appearance-none shadow-lg;
}

/* input[type='range']::-webkit-slider-thumb {
  @apply h-4 w-4 border-2 bg-red-400 rounded-full cursor-pointer appearance-none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type='range']::-moz-range-thumb {
  @apply h-4 w-4 border-2 bg-red-400 rounded-full cursor-pointer appearance-none;
  -moz-appearance: none;
} */
</style>
