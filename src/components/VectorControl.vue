<script setup lang="ts">
import { useKeyModifier, useMouse, useMousePressed } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { isVector2, isVector3, normalizeVectorFlexibleParam } from '../utils/'
import type { Control } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: Control
}>()

const emit = defineEmits(['change'])

const mouse = useMouse()
const { pressed } = useMousePressed()

const initialMouseX = ref(0)
const isMouseDown = ref(false)
const index = ref(0)
const focused = ref<number | null>(null) // new ref to track focused input
const step = ref(1)
const shiftKeyState = useKeyModifier('Shift')
const altKeyState = useKeyModifier('Alt')

watch(shiftKeyState, (newValue) => {
  step.value = newValue ? 10 : 1
})

watch(altKeyState, (newValue) => {
  step.value = newValue ? 0.1 : 1
})
  
const onInputFocus = ($index: number) => {
  focused.value = $index
}

const onInputBlur = () => {
  focused.value = null
}

const onInputMouseDown = (event: MouseEvent, $index: number) => {
  index.value = $index
  initialMouseX.value = event.clientX
  isMouseDown.value = true

}

const onInputMouseUp = (_event: MouseEvent, $index: number) => {
  index.value = $index
  isMouseDown.value = false
}

const onControlMouseUp = () => {
  isMouseDown.value = false
}

watch(pressed, (newValue) => {
  if (!newValue) {
    isMouseDown.value = false
  }
})

const calculateSpeed = (diff: number) => Math.floor(Math.abs(diff) / 10)

const vector = computed(() => normalizeVectorFlexibleParam(props.control.value))
const labels = ref(['x', 'y', 'z'])

const isVector = computed(() => isVector2(props.control.value) || isVector3(props.control.value))

function onChange(event: Event, $index: number) {
  const { value } = props.control
  const { target } = event
  index.value = $index

  value[isVector.value ? labels.value[index.value] : index.value] = parseFloat((target as HTMLInputElement).value)
  emit('change', value)
}

watch(mouse.x, (newValue) => {
  if (isMouseDown.value) {
    const diff = newValue - initialMouseX.value
    const speed = calculateSpeed(diff)
    const { value } = props.control
    const label = isVector.value ? labels.value[index.value] : index.value

    if (diff > 0) {
      value[label] += step.value + speed
    }
    else if (diff < 0) {
      value[label] -= step.value + speed
    }

    if (props.control.min !== undefined && value < props.control.min) {
      value[label] = props.control.min
    }

    if (props.control.max !== undefined && value > props.control.max) {
      value[label] = props.control.max
    }

    emit('change', value)

    initialMouseX.value = newValue
  }
})
</script>

<template>
  <div
    class="flex px-4 justify-between gap-1 items-center mb-2"
    @mouseup="onControlMouseUp()"
  >
    <ControlLabel
      :label="label"
      :control="control"
    />
    <div class="relative w-2/3 flex justify-between gap-0.5">
      <div
        v-for="(_subcontrol, $index) in vector"
        :key="label + $index"
        class="flex items-center bg-gray-100 rounded"
        :class="{ 'w-2/5': focused === $index, 'w-1/3': isVector3(control.value), 'w-1/2': isVector2(control.value) }" 
      >
        <span
          v-if="labels[$index] && isVector"
          class="font-bold px-1 py-1 text-0.65rem text-gray-300"
        >{{
          labels[$index]
        }}</span>
        
        <input
          :id="`${control.uniqueKey}-${labels[$index]}`"
          type="number"
          :step="step"
          class="w-full
            px-0
            p-1
            text-right
            text-0.65rem
            text-gray-400
            bg-transparent
            focus:border-gray-200
            outline-none
            border-none
            font-sans
            appearence-none"
          :value="vector[$index].toFixed(2)"
          :class="{ 'cursor-ew-resize': isMouseDown }"
          @input="onChange($event, $index)"
          @mousedown="onInputMouseDown($event, $index)"
          @mouseup="onInputMouseUp($event, $index)"
          @focus="onInputFocus($index)"
          @blur="onInputBlur"         
        >
      </div>
    </div>
  </div>
</template>
