<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { isVector2, isVector3, normalizeVectorFlexibleParam } from '../utils/'
import { Control } from '../types'

const props = defineProps<{
  label: string
  control: Control
}>()

const emit = defineEmits(['change'])

const mouse = useMouse()

const initialMouseX = ref(0)
const isMouseDown = ref(false)
const index = ref(0)

const onInputMouseDown = (event: MouseEvent, $index: number) => {
  index.value = $index
  initialMouseX.value = event.clientX
  isMouseDown.value = true
}

const onInputMouseUp = (_event: MouseEvent, $index: number) => {
  index.value = $index
  isMouseDown.value = false
}

const calculateSpeed = (diff: number) => {
  return Math.floor(Math.abs(diff) / 10)
}

const vector = computed(() => normalizeVectorFlexibleParam(props.control.value))
const labels = computed(() => Object.keys(props.control.value))

const isVector = computed(() => isVector2(props.control.value) || isVector3(props.control.value))

function onChange(event: Event, $index: number) {
  const { value } = props.control
  const { target } = event
  index.value = $index

  value[isVector.value ? labels.value[index.value] : index.value] = parseInt((target as HTMLInputElement).value, 10)
  emit('change', value)
}

watch(mouse.x, newValue => {
  if (isMouseDown.value) {
    const diff = newValue - initialMouseX.value
    const speed = calculateSpeed(diff)
    const { value } = props.control
    const label = isVector.value ? labels.value[index.value] : index.value

    if (diff > 0) {
      value[label] += 1 + speed
    } else if (diff < 0) {
      value[label] -= 1 + speed
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
  <div class="flex px-4 justify-between gap-2 items-center mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <div class="w-2/3 flex justify-between gap-1">
      <div
        v-for="(_subcontrol, $index) in vector"
        :key="label + $index"
        class="flex items-center w-1/3 bg-gray-100 rounded"
      >
        <span v-if="labels[$index] && isVector" class="font-bold px-0.5 py-1 text-0.65rem text-gray-300">{{
          labels[$index]
        }}</span>
        <input
          type="text"
          class="w-full pl-0 p-1 text-right text-0.65rem text-gray-400 bg-transparent focus:border-gray-200 outline-none border-none font-sans"
          :value="vector[$index].toFixed(2)"
          :class="{ 'cursor-ew-resize': isMouseDown }"
          @input="onChange($event, $index)"
          @mousedown="onInputMouseDown($event, $index)"
          @mouseup="onInputMouseUp($event, $index)"
        />
      </div>
    </div>
  </div>
</template>
