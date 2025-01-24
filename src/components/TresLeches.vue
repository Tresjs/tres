<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { useDraggable } from '../composables/useDraggable'
import { useWindowSize } from '@vueuse/core'
import { dispose, useControlsProvider } from '../composables/useControls'
import type { LechesControl } from '../types'
import Folder from './Folder.vue'
import { useMotion } from '@vueuse/motion'
import ControlInput from './ControlInput.vue'

import iconUrl from '../assets/tresleches-icon.svg?url'

const props = withDefaults(defineProps<{
  uuid?: string
  collapsed?: boolean
  float?: boolean
}>(), {
  uuid: 'default',
  collapsed: false,
  float: true,
})
const { uuid, collapsed, float } = toRefs(props)

const isCollapsed = ref(collapsed.value)
const isHover = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)
const showTopGradient = ref(false)
const showBottomGradient = ref(false)

const { width } = useWindowSize()
const { height: windowHeight } = useWindowSize()

const DEFAULT_WIDTH = 300
const MIN_HEIGHT = 100 // Minimum height for the panel
const MAX_HEIGHT = 600 // Maximum height for the panel
const CONTROL_HEIGHT = 40 // Approximate height per control
const FPS_GRAPH_EXTRA_HEIGHT = 12 // Extra padding needed for FPS graph
const MARGIN_FROM_BOTTOM = 40 // Margin to keep from bottom of viewport

const panelWidth = ref(DEFAULT_WIDTH)
const manualHeight = ref<number | null>(null) // Track manual height override
const isResizing = ref(false)
const resizeEdge = ref<'right' | 'left' | 'bottom' | 'corner' | 'corner-left' | null>(null)

const controls = useControlsProvider(uuid?.value)

defineExpose(controls)

// Add cleanup when component is unmounted
onUnmounted(() => {
  dispose(uuid?.value)
})

function onChange(key: string, value: string) {
  controls[key].value = value
}

const groupedControls = computed(() => {
  const groups: { [folder: string]: LechesControl[] } = {}

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

const panelHeight = computed(() => {
  if (isCollapsed.value) { return 28 } // Height when collapsed

  // If manually resized, use that height within constraints
  if (manualHeight.value !== null) {
    const maxAllowedHeight = float.value ? windowHeight.value - MARGIN_FROM_BOTTOM : MAX_HEIGHT
    return Math.min(maxAllowedHeight, Math.max(MIN_HEIGHT, manualHeight.value))
  }

  // Calculate total controls including those in folders
  let totalControls = 0
  let hasFPSGraph = false
  for (const folderName in groupedControls.value) {
    const controls = groupedControls.value[folderName]
    totalControls += controls.length
    // Add height for folder header if it's not the default folder
    if (folderName !== 'default') { totalControls += 1 }
    // Check if there's an FPS graph control
    if (controls.some(control => control.type === 'fpsgraph')) {
      hasFPSGraph = true
    }
  }

  // Calculate height: header (32px) + controls + padding + extra for FPS if present
  const calculatedHeight = 32 + (totalControls * CONTROL_HEIGHT) + 32 + (hasFPSGraph ? FPS_GRAPH_EXTRA_HEIGHT : 0)
  const maxAllowedHeight = float.value ? windowHeight.value - MARGIN_FROM_BOTTOM : MAX_HEIGHT
  return Math.min(maxAllowedHeight, Math.max(MIN_HEIGHT, calculatedHeight))
})

const paneRef = ref<HTMLElement | null>(null)
const handleRef = ref<HTMLElement | null>(null)

const { style, position: dragPosition } = useDraggable(paneRef, {
  handle: handleRef,
  initialValue: {
    x: width.value - 40,
    y: 10,
  },
})

const { apply } = useMotion(paneRef, {
  initial: {
    opacity: 0,
    y: 100,
    width: 28,
    height: 28,
    right: '1rem',
    left: 'auto',
  },
  enter: {
    opacity: 1,
    y: 0,
    width: 28,
    height: 28,
    right: '1rem',
    left: 'auto',
  },
  leave: {
    opacity: 0,
    y: 100,
    width: 28,
    height: 28,
    right: '1rem',
    left: 'auto',
  },
})

const handleScroll = () => {
  if (!scrollContainer.value) { return }

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
  showTopGradient.value = scrollTop > 20
  showBottomGradient.value = scrollHeight - scrollTop - clientHeight > 20
}

function startResize(edge: 'right' | 'left' | 'bottom' | 'corner' | 'corner-left', e: MouseEvent) {
  isResizing.value = true
  resizeEdge.value = edge
  e.preventDefault()
  e.stopPropagation()

  const startX = e.clientX
  const startY = e.clientY
  const startWidth = panelWidth.value
  const startHeight = manualHeight.value ?? panelHeight.value
  const startDragX = dragPosition.value.x

  function onMouseMove(e: MouseEvent) {
    if (!isResizing.value || !paneRef.value) { return }

    if (resizeEdge.value === 'right' || resizeEdge.value === 'corner') {
      const deltaX = e.clientX - startX
      panelWidth.value = Math.max(280, startWidth + deltaX)
      paneRef.value.style.maxWidth = `${panelWidth.value}px`
    }

    if (resizeEdge.value === 'left' || resizeEdge.value === 'corner-left') {
      const deltaX = startX - e.clientX
      const newWidth = Math.max(280, startWidth + deltaX)
      dragPosition.value.x = startDragX - deltaX
      panelWidth.value = newWidth
      paneRef.value.style.maxWidth = `${panelWidth.value}px`
    }

    if (resizeEdge.value === 'bottom' || resizeEdge.value === 'corner' || resizeEdge.value === 'corner-left') {
      const deltaY = e.clientY - startY
      const maxAllowedHeight = float.value ? windowHeight.value - MARGIN_FROM_BOTTOM : MAX_HEIGHT
      manualHeight.value = Math.min(maxAllowedHeight, Math.max(MIN_HEIGHT, startHeight + deltaY))
      paneRef.value.style.maxHeight = `${manualHeight.value}px`
      // Update gradients after resize
      handleScroll()
    }
  }

  function onMouseUp() {
    isResizing.value = false
    resizeEdge.value = null
    // Update gradients one final time after resize
    handleScroll()
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

watch(isCollapsed, async (value) => {
  if (!value) {
    await apply({
      width: panelWidth.value,
      height: panelHeight.value,
      right: '1rem',
      left: 'auto',
    })
    return
  }
  await apply('enter')
}, { immediate: true })

onMounted(() => {
  handleScroll()
})
</script>

<template>
  <div class="tresleches-container">
    <div
      :id="`tres-leches-pane-${uuid}`"
      ref="paneRef"
      class="tl-top-4 tl-z-24 tl-bg-white dark:tl-bg-dark-200 tl-shadow-xl tl-p-1 tl-font-sans tl-text-xs tl-flex tl-flex-col tl-rounded-lg"
      :class="[
        $attrs.class,
        float ? 'tl-absolute' : 'tl-relative',
      ]"
      :style="[float ? style : null, { width: `${panelWidth}px`, height: `${panelHeight}px`, right: '16px', left: 'auto' }]"
    >
      <header class="tl-flex tl-justify-between tl-items-center tl-text-gray-200 dark:tl-text-gray-600 tl-text-xs tl-flex-none">
        <div v-show="!isCollapsed" class="w-1/3"></div>
        <div v-if="!isCollapsed && float" ref="handleRef" class="tl-cursor-grabbing w-1/3">
          <i class="i-ic-baseline-drag-indicator"></i><i class="i-ic-baseline-drag-indicator"></i><i
            class="i-ic-baseline-drag-indicator"
          ></i>
        </div>
        <div class="tl-flex tl-justify-end">
          <img
            :src="iconUrl"
            alt="TresLechesIcon"
            class="
              tl-p-1.5
              tl-w-4 tl-h-4
              tl-rounded-full
              tl-bg-gray-100
              dark:tl-bg-dark-300
              tl-cursor-pointer
              "
            @click="isCollapsed = !isCollapsed"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false"
          />
        </div>
      </header>
      <div v-show="!isCollapsed" class="tl-flex-1 tl-relative tl-overflow-hidden tl-my-4">
        <!-- Gradient overlays moved outside scrollable area -->
        <div
          class="tl-pointer-events-none tl-absolute tl-left-0 tl-right-0 tl-top-0 tl-h-8 tl-bg-gradient-linear tl-bg-gradient-to-b tl-from-white dark:tl-from-dark-200 tl-to-transparent tl-z-20 tl-opacity-0 tl-transition-opacity duration-200"
          :class="{ '!tl-opacity-100': showTopGradient }"
        ></div>
        <div
          class="tl-pointer-events-none tl-absolute tl-left-0 tl-right-0 tl-bottom-0 tl-h-8 tl-bg-gradient-linear tl-bg-gradient-to-t tl-from-white dark:tl-from-dark-200 tl-to-transparent tl-z-20 tl-opacity-0 tl-transition-opacity duration-200"
          :class="{ '!tl-opacity-100': showBottomGradient }"
        ></div>
        <div
          ref="scrollContainer"
          class="tl-h-full tl-overflow-y-auto tl-overflow-x-hidden tl-scrollbar tl-scrollbar-rounded tl-scrollbar-w-4px tl-scrollbar-radius-2 tl-scrollbar-track-radius-4 tl-scrollbar-thumb-radius-4 tl-scrollbar-track-color-gray-100 dark:tl-scrollbar-track-color-dark-300 tl-scrollbar-thumb-color-gray-300 dark:tl-scrollbar-thumb-color-gray-400"
          @scroll="handleScroll"
        >
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
                @change="newValue => onChange(control.key, newValue)"
              />
            </template>
          </template>
        </div>
      </div>
      <!-- Resize handles -->
      <!-- <span
        v-if="!isCollapsed"
        class="tl-absolute tl-right-0 tl-top-0 tl-bottom-0 tl-w-2 hover:tl-w-4 tl-transition-all tl-cursor-ew-resize tl-z-10"
        @mousedown="e => startResize('right', e)"
      ></span> -->
      <span
        v-if="!isCollapsed"
        class="tl-absolute tl-left-0 tl-right-0 tl-bottom-0 tl-h-2 hover:tl-h-4 tl-transition-all tl-cursor-ns-resize tl-z-10"
        @mousedown="e => startResize('bottom', e)"
      ></span>
      <!-- <span
        v-if="!isCollapsed"
        class="tl-absolute tl-right-0 tl-bottom-0 tl-w-4 tl-h-4 hover:tl-w-6 hover:tl-h-6 tl-transition-all tl-cursor-nwse-resize tl-z-10"
        @mousedown="e => startResize('corner', e)"
      ></span> -->
      <span
        v-if="!isCollapsed"
        class="tl-absolute tl-left-0 tl-top-0 tl-bottom-0 tl-w-2 hover:tl-w-4 tl-transition-all tl-cursor-ew-resize tl-z-10"
        @mousedown="e => startResize('left', e)"
      ></span>
      <span
        v-if="!isCollapsed"
        class="tl-absolute tl-left-0 tl-bottom-0 tl-w-4 tl-h-4 hover:tl-w-6 hover:tl-h-6 tl-transition-all tl-cursor-nesw-resize tl-z-10"
        @mousedown="e => startResize('corner-left', e)"
      ></span>
    </div>
  </div>
</template>
