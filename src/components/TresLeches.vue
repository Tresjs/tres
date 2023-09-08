<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, toRefs, unref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { UseDraggable } from '../composables/useDraggable/component'
import { useControlsProvider } from '../composables/useControls'
import type { Control } from '../types'
import Folder from './Folder.vue'

import ControlInput from './ControlInput.vue'

const props = defineProps<{
  uuid?: string
}>()

const { uuid } = toRefs(props)

const { width } = useWindowSize()

const DEFAULT_WIDTH = 280

const handle = ref<HTMLElement | null>(null)

const controls = useControlsProvider(uuid?.value)

function onChange(label: Ref<string>, value: string) {
  controls[unref(label)].value = value as any
  controls[unref(label)][unref(label)] = value as any
}

const groupedControls = computed(() => {
  const groups: { [folder: string]: Control[] } = {}

  for (const key in controls) {
    const control = controls[key]
    const folderName = control.folder || 'default' // Ensure we access the value of the ref

    if (!groups[folderName as unknown as string]) {
      groups[folderName as unknown as string] = []
    }
    groups[folderName as unknown as string].push(control)
  }

  return groups
})
</script>

<template>
  <UseDraggable
    :id="uuid"
    :initial-value="{ x: width - DEFAULT_WIDTH - 40, y: 10 }"
    class="absolute select-none z-24 w-280px font-sans text-xs"
    :class="$attrs.class"
    :handle="handle"
  >
    <div class="bg-white shadow-xl rounded border-4 border-solid border-black">
      <header
        ref="handle"
        class="relative cursor-grabbing p-4 flex justify-between text-gray-200 relative"
      >
        <i class="h-4 w-4 p-1.5 flex items-center line-height-0 rounded-full bg-gray-100 text-xs">🍰</i>
        <div>
          <i class="i-ic-baseline-drag-indicator" /><i class="i-ic-baseline-drag-indicator" /><i
            class="i-ic-baseline-drag-indicator"
          />
        </div>
        <div />
      </header>
      <template
        v-for="(group, folderName) of groupedControls"
        :key="folderName"
      >
        <Folder
          v-if="folderName !== 'default'"
          :label="folderName"
          :controls="group"
        />
        <template v-if="folderName === 'default'">
          <ControlInput 
            v-for="control in group"  
            :key="control.label" 
            :control="control" 
            @change="newValue => onChange(control.label, newValue)" 
          />
        </template>
      </template>
    </div>
  </UseDraggable>
</template>