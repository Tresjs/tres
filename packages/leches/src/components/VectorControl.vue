<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import { isVector2, isVector3, normalizeVectorFlexibleParam } from '../utils/'
import { clampValue, defaultFormat, getInputMode } from '../utils/format'
import { useNumberDrag } from '../composables/useNumberDrag'
import type { LechesVectorControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesVectorControl
}>()

const emit = defineEmits(['change'])

const controlValue = computed(() => unref(props.control.value))
const vector = computed(() => normalizeVectorFlexibleParam(controlValue.value))
const labels = ref(['x', 'y', 'z'])
const isVector = computed(() => isVector2(controlValue.value) || isVector3(controlValue.value))

const step = computed(() => props.control.step ?? 1)
const formatter = computed(() => props.control.format ?? defaultFormat(step.value))

const focused = ref<number | null>(null)

const displayValues = ref<string[]>([])

function syncDisplayValues() {
  const v = vector.value
  displayValues.value = v.map((val: number) => formatter.value(val))
}

syncDisplayValues()

watch(controlValue, () => {
  if (focused.value === null) {
    syncDisplayValues()
  }
}, { deep: true })

function emitAxisChange(index: number, newAxisValue: number) {
  const value = controlValue.value
  const label = isVector.value ? labels.value[index] : index
  value[label] = newAxisValue
  emit('change', value)
}

function createDragForAxis(index: number) {
  return useNumberDrag({
    getValue: () => vector.value[index],
    step,
    min: computed(() => props.control.min),
    max: computed(() => props.control.max),
    onUpdate: (v) => {
      emitAxisChange(index, v)
      displayValues.value[index] = formatter.value(v)
    },
    formatDelta: v => formatter.value(v),
  })
}

const axisDrags = [createDragForAxis(0), createDragForAxis(1), createDragForAxis(2)]

function onFocus(index: number) {
  focused.value = index
  displayValues.value[index] = String(vector.value[index])
}

function onBlur(index: number) {
  focused.value = null
  const parsed = Number.parseFloat(displayValues.value[index])
  if (Number.isNaN(parsed)) {
    displayValues.value[index] = formatter.value(vector.value[index])
    return
  }
  const clamped = clampValue(parsed, props.control.min, props.control.max)
  emitAxisChange(index, clamped)
  displayValues.value[index] = formatter.value(clamped)
}

function onKeyDown(e: KeyboardEvent, index: number) {
  if (e.key === 'Enter') {
    ;(e.target as HTMLInputElement).blur()
    return
  }
  const modifier = e.shiftKey ? 10 : e.altKey ? 0.1 : 1
  const current = vector.value[index]
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const newVal = clampValue(current + step.value * modifier, props.control.min, props.control.max)
    emitAxisChange(index, newVal)
    displayValues.value[index] = formatter.value(newVal)
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const newVal = clampValue(current - step.value * modifier, props.control.min, props.control.max)
    emitAxisChange(index, newVal)
    displayValues.value[index] = formatter.value(newVal)
  }
  if (e.key === 'PageUp') {
    e.preventDefault()
    const newVal = clampValue(current + step.value * 10, props.control.min, props.control.max)
    emitAxisChange(index, newVal)
    displayValues.value[index] = formatter.value(newVal)
  }
  if (e.key === 'PageDown') {
    e.preventDefault()
    const newVal = clampValue(current - step.value * 10, props.control.min, props.control.max)
    emitAxisChange(index, newVal)
    displayValues.value[index] = formatter.value(newVal)
  }
}
</script>

<template>
  <div
    class="tl-flex tl-gap-1 tl-justify-between tl-items-center"
    style="padding: 0 var(--tl-h-padding); margin-bottom: var(--tl-unit-spacing);"
  >
    <ControlLabel :label="label" :control="control" />
    <div class="tl-relative tl-w-2/3 tl-flex tl-justify-between tl-gap-0.5">
      <div
        v-for="(_subcontrol, $index) in vector"
        :key="label + $index"
        class="leches-num tl-relative tl-flex tl-items-center tl-text-gray-400 tl-bg-gray-100 dark:tl-bg-dark-300 tl-rounded tl-border-none tl-outline-none tl-focus:tl-border-gray-200 tl-focus:tl-ring tl-focus:tl-ring-gray-200"
        :class="{
          'tl-w-2/5': focused === $index,
          'tl-w-1/3': isVector3(controlValue),
          'tl-w-1/2': isVector2(controlValue),
          'leches-num--drg': axisDrags[$index].isDragging.value,
        }"
      >
        <div class="leches-knob leches-knob--inline" @mousedown="axisDrags[$index].onMouseDown($event)"></div>
        <span
          v-if="labels[$index] && isVector"
          class="tl-font-bold tl-py-0.5 tl-text-0.65rem tl-text-gray-300 dark:tl-text-gray-400"
        >{{ labels[$index] }}</span>

        <input
          :id="`${control.uniqueKey}-${labels[$index]}`"
          v-model="displayValues[$index]"
          type="text"
          :inputmode="getInputMode(step)"
          role="spinbutton"
          :aria-valuenow="vector[$index]"
          :aria-valuemin="control.min"
          :aria-valuemax="control.max"
          class="tl-w-full
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
          style="padding: var(--tl-input-padding);"
          @focus="onFocus($index)"
          @blur="onBlur($index)"
          @keydown="onKeyDown($event, $index)"
        />
      </div>
    </div>
  </div>
</template>
