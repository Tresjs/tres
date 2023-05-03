<script setup lang="ts">
import { Vector2, Vector3 } from 'three'

import { useMouse } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { normalizeVectorFlexibleParam } from '../utils/'

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

const vector = computed(() => normalizeVectorFlexibleParam(props.control.value))
const labels = computed(() => Object.keys(props.control.value))

const isVector = computed(() => props.control.value instanceof Vector2 || props.control.value instanceof Vector3)
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
  <div class="flex justify-between gap-2 items-center mb-2">
    <label class="text-gray-500 w-1/3">{{ label }}</label>
    <div class="w-2/3 flex justify-between gap-1">
      <div
        v-for="(_subcontrol, index) in vector"
        :key="label + index"
        class="flex items-center w-1/3 bg-gray-100 rounded"
      >
        <span v-if="labels[index] && isVector" class="font-bold px-0.5 py-1 text-0.65rem text-gray-300">{{
          labels[index]
        }}</span>
        <input
          type="text"
          :value="vector[index].toFixed(2)"
          class="w-full pl-0 p-1 text-right text-0.65rem text-gray-400 bg-transparent focus:border-gray-200 outline-none border-none font-sans"
        />
      </div>
    </div>
    <!--  <input
      v-for="(_subcontrol, index) in control.value"
      :key="label + index"
      v-model="control.value[index]"
      class="p-2 w-1/3 rounded text-right text-xs text-gray-400 bg-gray-100 focus:border-gray-200 outline-none border-none font-sans"
      type="number"
      :class="{ 'cursor-ew-resize': isMouseDown }"
      :min="control.min[index]"
      :max="control.max[index]"
      :step="control.step[index]"
      @mousedown="onInputMouseDown"
      @mouseup="onInputMouseUp"
    /> -->
  </div>
</template>
