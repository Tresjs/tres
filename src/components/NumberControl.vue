<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps<{
  label: string
  control: Control
}>()
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
  <div class="flex justify-between gap-4 items-center mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <input
      v-model="control.value"
      class="p-2 w-1/3 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
      type="number"
      :class="{ 'cursor-ew-resize': isMouseDown }"
      :min="control.min"
      :max="control.max"
      :step="control.step"
      @mousedown="onInputMouseDown"
      @mouseup="onInputMouseUp"
    />
  </div>
</template>
