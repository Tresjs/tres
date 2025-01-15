<script setup lang="ts">
import type { Control } from '../types'

const props = defineProps<{
  label: string
  control: Control
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
  <div class="tl-flex tl-px-4 tl-justify-start tl-gap-2 tl-items-center tl-mb-2 tl-min-h-32px">
    <label class="tl-text-gray-500 tl-w-1/3">{{ label }}</label>
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
        :aria-checked="control.value.toString()"
        :class="{ 'tl-bg-dark-500': control.value, 'tl-bg-gray-200': !control.value }"
        class="tl-w-4
          tl-h-4
          tl-flex
          tl-justify-center
          tl-items-center
          tl-rounded
          tl-border
          tl-border-gray-300
          tl-mr-2
          tl-transition-colors
          tl-duration-200"
        @keydown="onKeydown"
      >
        <i
          v-show="control.value"
          class="i-ic:baseline-check tl-text-light"
        ></i></span>
    </label>
  </div>
</template>
