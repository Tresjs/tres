<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  label: string
  value: any
  type?: string
  path?: string
  min?: number
  max?: number
  step?: number
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).valueAsNumber)
}

function onKeydown(event: KeyboardEvent) {
  if (event.code === 'Space' || event.code === 'Enter') {
    event.preventDefault() // Prevent scrolling when space is pressed
    emit('change', !props.value)
  }
}

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
      emit('change', props.value + 1 + speed)
    }
    else if (diff < 0) {
      emit('change', props.value - 1 + speed)
    }

    if (props.min !== undefined && props.value < props.min) {
      emit('change', props.min)
    }

    if (props.max !== undefined && props.value > props.max) {
      emit('change', props.max)
    }

    initialMouseX.value = newValue
  }
})
</script>

<template>
  <div class="flex justify-start gap-2 items-center">
    <input
      :id="path"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      class="
        bg-gray-50
        px-2 py-1
        text-xs 
        font-mono
        rounded
        text-right
        focus:border-gray-200
        outline-none
        border-none
        w-1/3
        w-max-content
      "
      type="number"
      :class="{ 'cursor-ew-resize': isMouseDown }"
      @input="onChange"
      @mousedown="onInputMouseDown"
      @mouseup="onInputMouseUp"
    >
  </div>
</template>
