<script setup lang="ts">
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { UseDraggable } from '../composables/useDraggable/component'

import { useControlsProvider } from '../composables/useControls'
import ControlInput from './ControlInput.vue'
import { Control } from '../types'

const { width } = useWindowSize()

const DEFAULT_WIDTH = 280

const handle = ref<HTMLElement | null>(null)

const controls = useControlsProvider()

function onChange(value: string, control: Control) {
  if (control.ref) {
    control.ref[control.label] = value
    control.value = value
  } else {
    control.value = value
  }
}
</script>
<template>
  <UseDraggable
    :initial-value="{ x: width - DEFAULT_WIDTH - 20, y: 10 }"
    class="absolute select-none z-24 w-280px font-sans text-xs"
    :class="$attrs.class"
    :handle="handle"
  >
    <div class="bg-white shadow-xl rounded border-4 border-solid border-black">
      <header ref="handle" class="relative cursor-grabbing p-4 flex justify-between text-gray-200 relative">
        <i class="h-4 w-4 p-1.5 flex items-center line-height-0 rounded-full bg-gray-100 text-xs">🍰</i>
        <div>
          <i class="i-ic-baseline-drag-indicator" /><i class="i-ic-baseline-drag-indicator" /><i
            class="i-ic-baseline-drag-indicator"
          />
        </div>
        <div></div>
      </header>
      <template v-for="control of controls" :key="control.label">
        <ControlInput :control="control" @change="newValue => onChange(newValue, control)" />
      </template>
    </div>
  </UseDraggable>
</template>
