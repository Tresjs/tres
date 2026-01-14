<script setup lang="ts">
import { useKeyModifier, useMouse, useMousePressed } from '@vueuse/core'
import { computed, ref, unref, watch } from 'vue'
import { isVector2, isVector3, normalizeVectorFlexibleParam } from '../utils/'
import type { LechesVectorControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesVectorControl
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

const controlValue = computed(() => unref(props.control.value))
const vector = computed(() => normalizeVectorFlexibleParam(controlValue.value))
const labels = ref(['x', 'y', 'z'])

const isVector = computed(() => isVector2(controlValue.value) || isVector3(controlValue.value))

function onChange(event: Event, $index: number) {
  const value = controlValue.value
  const { target } = event
  index.value = $index

  value[isVector.value ? labels.value[index.value] : index.value] = Number.parseFloat((target as HTMLInputElement).value)
  emit('change', value)
}

watch(mouse.x, (newValue) => {
  if (isMouseDown.value) {
    const diff = newValue - initialMouseX.value
    const speed = calculateSpeed(diff)
    const value = controlValue.value
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
    class="tl-flex tl-px-4 tl-gap-1 tl-justify-between tl-items-center tl-mb-2"
    @mouseup="onControlMouseUp()"
  >
    <ControlLabel
      :label="label"
      :control="control"
    />
    <div class="tl-relative tl-w-2/3 tl-flex tl-justify-between tl-gap-0.5">
      <div
        v-for="(_subcontrol, $index) in vector"
        :key="label + $index"
        class="tl-flex tl-items-center tl-bg-gray-100 dark:tl-bg-dark-300 tl-rounded tl-border-none tl-outline-none tl-focus:tl-border-gray-200 tl-focus:tl-ring tl-focus:tl-ring-gray-200"
        :class="{
          'tl-w-2/5': focused === $index,
          'tl-w-1/3': isVector3(controlValue),
          'tl-w-1/2': isVector2(controlValue),
        }"
      >
        <span
          v-if="labels[$index] && isVector"
          class="tl-font-bold tl-px-1 tl-py-1 tl-text-0.65rem tl-text-gray-300 dark:tl-text-gray-400"
        >{{
          labels[$index]
        }}</span>

        <input
          :id="`${control.uniqueKey}-${labels[$index]}`"
          type="number"
          :step="step"
          class="tl-w-full
            tl-px-0
            tl-p-1
            tl-text-right
            tl-text-0.65rem
            tl-text-gray-400
            dark:tl-text-gray-400
            tl-bg-transparent
            focus:tl-border-gray-200
            tl-outline-none
            tl-border-none
            tl-font-sans
            tl-appearence-none"
          :value="vector[$index].toFixed(2)"
          :class="{ 'tl-cursor-ew-resize': isMouseDown }"
          @input="onChange($event, $index)"
          @mousedown="onInputMouseDown($event, $index)"
          @mouseup="onInputMouseUp($event, $index)"
          @focus="onInputFocus($index)"
          @blur="onInputBlur"
        />
      </div>
    </div>
  </div>
</template>
