<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMouse } from '@vueuse/core'
import type { LechesNumberControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesNumberControl
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).valueAsNumber)
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
  <div class="tl-flex tl-px-4 tl-gap-1 tl-justify-between  tl-items-center tl-mb-2">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <input
      :id="control.uniqueKey"
      :value="control.value"
      class="tl-leches-input tl-w-2/3"
      type="number"
      :class="{ 'tl-cursor-ew-resize': isMouseDown }"
      :min="control.min"
      :max="control.max"
      :step="control.step"
      @input="onChange"
      @mousedown="onInputMouseDown"
      @mouseup="onInputMouseUp"
    />
  </div>
</template>
