<script setup lang="ts">
import type { LechesBooleanControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesBooleanControl
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).checked)
}

function onKeydown(event: KeyboardEvent) {
  if (event.code === 'Space' || event.code === 'Enter') {
    event.preventDefault() // Prevent scrolling when space is pressed
    emit('change', !props.control.value)
  }
}
</script>

<template>
  <div class="tl-flex tl-px-4 tl-gap-1 tl-justify-start tl-items-center tl-mb-2 tl-min-h-32px">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <input
      :id="control.uniqueKey"
      :checked="control.value"
      class="tl-hidden"
      type="checkbox"
      @input="onChange"
    />
    <label
      :for="control.uniqueKey"
      class="tl-inline-flex tl-items-center tl-cursor-pointer"
    >
      <span
        tabindex="0"
        role="checkbox"
        :aria-checked="control.value"
        :class="{ 'tl-bg-dark-500 dark:tl-bg-gray-400': control.value,
                  'tl-bg-gray-100 dark:tl-bg-dark-300': !control.value }"
        class="tl-w-4
          tl-h-4
          tl-flex
          tl-justify-center
          tl-items-center
          tl-rounded
          tl-border
          tl-border-gray-300
          tl-text-white
          tl-outline-none
          tl-border-none
          focus:tl-border-gray-200
          focus:tl-ring-2
          focus:tl-ring-gray-200
          tl-mr-2
          tl-transition-colors
          tl-duration-200"
        @keydown="onKeydown"
      >
        <i
          v-show="control.value"
          class="i-ic:baseline-check tl-text-light dark:tl-text-dark"
        ></i></span>
    </label>
  </div>
</template>
