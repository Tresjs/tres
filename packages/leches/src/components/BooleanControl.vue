<script setup lang="ts">
import { computed, unref } from 'vue'
import type { LechesBooleanControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesBooleanControl
}>()

const emit = defineEmits(['change'])

const controlValue = computed(() => unref(props.control.value))

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).checked)
}

function onKeydown(event: KeyboardEvent) {
  if (event.code === 'Space' || event.code === 'Enter') {
    event.preventDefault() // Prevent scrolling when space is pressed
    emit('change', !controlValue.value)
  }
}
</script>

<template>
  <div class="tl-flex tl-gap-1 tl-items-center" style="padding: 0 var(--tl-h-padding); margin-bottom: var(--tl-unit-spacing);">
    <ControlLabel
      :label="label"
      :control="control"
    />
    <input
      :id="control.uniqueKey"
      :checked="controlValue"
      class="tl-hidden"
      type="checkbox"
      @input="onChange"
    />
    <label
      :for="control.uniqueKey"
      class="tl-w-2/3 tl-inline-flex tl-items-center tl-cursor-pointer"
    >
      <span
        tabindex="0"
        role="checkbox"
        :aria-checked="controlValue"
        :class="{ 'tl-bg-dark-500 dark:tl-bg-gray-400': controlValue,
                  'tl-bg-gray-100 dark:tl-bg-dark-300': !controlValue }"
        class="leches-checkbox
          tl-flex
          tl-justify-center
          tl-items-center
          tl-rounded
          tl-text-white
          tl-outline-none
          tl-border-none
          focus:tl-border-gray-200
          focus:tl-ring-2
          focus:tl-ring-gray-200
          tl-transition-colors
          tl-duration-200"
        @keydown="onKeydown"
      >
        <i
          v-show="controlValue"
          class="i-ic:baseline-check tl-text-light dark:tl-text-dark"
        ></i></span>
    </label>
  </div>
</template>

<style>
.leches-checkbox {
  width: 16px;
  height: 16px;
  min-width: 16px;
}
</style>
