<script setup lang="ts">
import { computed, unref } from 'vue'
import type { LechesControl } from '../types'
import ControlLabel from './ControlLabel.vue'

const props = defineProps<{
  label: string
  control: LechesControl
}>()

const emit = defineEmits(['change'])

const controlValue = computed(() => unref(props.control.value))

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).value)
}
</script>

<template>
  <div class="tl-flex tl-gap-1 tl-items-center" style="padding: 0 var(--tl-h-padding); margin-bottom: var(--tl-unit-spacing);">
    <ControlLabel :label="label" :control="control" />
    <label
      :for="`${control.uniqueKey}-color`"
      class="leches-color-container tl-leches-input tl-w-2/3"
    >
      <input
        :id="`${control.uniqueKey}-color`"
        tabindex="0"
        :value="controlValue"
        :aria-label="label"
        class="leches-color"
        type="color"
        @input="onChange"
      />
      <span class="leches-color-hex">{{ controlValue }}</span>
    </label>
  </div>
</template>

<style>
.leches-color-container {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  height: var(--tl-unit-size);
  line-height: var(--tl-unit-size);
  padding: var(--tl-input-padding);
  border-radius: var(--tl-blade-radius);
  font-size: var(--tl-font-size);
}

.leches-color {
  @apply tl-appearance-none tl-bg-transparent tl-outline-none tl-border-none tl-box-border tl-cursor-pointer;
  width: 14px !important;
  height: 14px !important;
  min-width: 14px;
  padding: 0 !important;
}

.leches-color::-webkit-color-swatch-wrapper {
  @apply tl-p-0 tl-border-none;
  width: 14px;
  height: 14px;
}

.leches-color::-webkit-color-swatch {
  @apply tl-p-0 tl-border-none;
  border-radius: 0;
  width: 14px;
  height: 14px;
}

.leches-color-hex {
  @apply tl-uppercase;
  font-size: var(--tl-font-size);
  line-height: 1;
}
</style>
