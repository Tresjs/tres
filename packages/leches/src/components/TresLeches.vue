<script setup lang="ts">
import { computed, isRef, nextTick, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { useDraggable } from '../composables/useDraggable'
import { useWindowSize } from '@vueuse/core'
import { dispose, useControlsProvider, useControlsStore } from '../composables/useControls'
import type { LechesControlUnion } from '../types'
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
const slots = defineSlots<{
  default: () => any
}>()

const { uuid, collapsed, float } = toRefs(props)

// Panel
const isCollapsed = ref(collapsed.value)
const isCollapsedAndNotFloat = computed(() => {
  return isCollapsed.value && !float.value
})
const scrollContainer = ref<HTMLElement | null>(null)
const showTopGradient = ref(false)
const showBottomGradient = ref(false)
const { width } = useWindowSize()
const { height: windowHeight } = useWindowSize()
const isInitialized = ref(false)
const isResizing = ref(false)

const DEFAULT_WIDTH = 280
const COLLAPSED_SIZE = 36
const MIN_HEIGHT = 100
const MAX_HEIGHT = 600
const HEADER_HEIGHT = 32 // button(28px) + wrapper padding(4px)
const CONTENT_PADDING = 32 // tl-py-4 = 16px top + 16px bottom
const CONTROL_HEIGHT = 24 // 20px unit + 4px spacing
const FPS_GRAPH_EXTRA_HEIGHT = 24

const panelWidth = ref(DEFAULT_WIDTH)
const resizeEdge = ref<'right' | 'left' | 'bottom' | 'corner' | 'corner-left' | null>(null)

// Controls
useControlsProvider(uuid?.value)
const hasSlots = ref(false)
const { store: controlsStore, triggers: controlsTriggers } = useControlsStore()

// Reactive getter — controlsStore[uuid] may not exist yet when TresLeches
// mounts before child components register their controls via useControls()
const controls = computed(() => controlsStore[uuid.value] || {})

defineExpose({ controls })

function onChange(key: string, value: string) {
  const control = controls.value[key] as any
  if (!control) { return }
  // Update the ref (control.value is a ref)
  if (isRef(control.value)) {
    control.value.value = value
  }
  else {
    control.value = value
  }
}

const groupedControls = computed(() => {
  // Access UUID-specific trigger to force re-computation when controls are added
  void controlsTriggers[uuid.value]

  // Access controlsStore directly to ensure reactivity tracks property additions
  const storeControls = controlsStore[uuid.value] || {}
  const groups: { [folder: string]: LechesControlUnion[] } = {}

  for (const key of Object.keys(storeControls)) {
    const control = storeControls[key]
    const folderName = control.folder || 'default' // Ensure we access the value of the ref

    if (!groups[folderName as unknown as string]) {
      groups[folderName as unknown as string] = []
    }
    groups[folderName as unknown as string].push(control)
  }

  return groups
})

function calculateHeight() {
  if (isCollapsedAndNotFloat.value) { return COLLAPSED_SIZE } // Height when collapsed

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

  const calculatedHeight = HEADER_HEIGHT + CONTENT_PADDING + (totalControls * CONTROL_HEIGHT) + (hasFPSGraph ? FPS_GRAPH_EXTRA_HEIGHT : 0)
  const maxAllowedHeight = float.value ? windowHeight.value : MAX_HEIGHT
  return Math.min(maxAllowedHeight, Math.max(MIN_HEIGHT, calculatedHeight))
}

const panelHeight = ref(calculateHeight())

const paneRef = ref<HTMLElement | null>(null)
const handleRef = ref<HTMLElement | null>(null)

const { style, position: dragPosition } = useDraggable(paneRef, {
  handle: handleRef,
  initialValue: {
    x: width.value - 40,
    y: 10,
  },
})

const panelStyle = computed(() => {
  if (float.value) {
    return [
      style.value,
      { width: `${panelWidth.value}px`, height: `${panelHeight.value}px`, right: '16px', left: 'auto' },
    ]
  }
  else {
    return [
      { width: 'auto', height: 'auto' },
    ]
  }
})

const motionConfig = float.value
  ? {
      initial: {
        opacity: 0,
        y: 100,
        width: COLLAPSED_SIZE,
        height: COLLAPSED_SIZE,
        right: '1rem',
        left: 'auto',
      },
      enter: {
        opacity: 1,
        y: 0,
        width: COLLAPSED_SIZE,
        height: COLLAPSED_SIZE,
        right: '1rem',
        left: 'auto',
      },
      leave: {
        opacity: 0,
        y: 100,
        width: COLLAPSED_SIZE,
        height: COLLAPSED_SIZE,
        right: '1rem',
        left: 'auto',
      },
    }
  : {
      initial: { opacity: 1 },
      enter: { opacity: 1 },
    }

const { apply } = useMotion(paneRef, {
  initial: motionConfig.initial,
  enter: motionConfig.enter,
  ...(motionConfig.leave ? { leave: motionConfig.leave } : {}),
})

// Recalculate height when controls are added/removed (e.g. child components mounting)
watch(groupedControls, async () => {
  const newHeight = calculateHeight()
  if (newHeight === panelHeight.value) { return }
  panelHeight.value = newHeight
  if (!isCollapsed.value && float.value) {
    await apply({
      width: panelWidth.value,
      height: newHeight,
      right: '1rem',
      left: 'auto',
    })
  }
}, { flush: 'post' })

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
  const startHeight = panelHeight.value
  const startDragX = dragPosition.value.x

  // Calculate the natural height where content fits without scrollbar
  const scrollOverflow = scrollContainer.value
    ? scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    : 0
  const naturalHeight = startHeight + scrollOverflow

  function onMouseMove(e: MouseEvent) {
    if (!isResizing.value || !paneRef.value) { return }

    if (resizeEdge.value === 'right' || resizeEdge.value === 'corner') {
      const deltaX = e.clientX - startX
      panelWidth.value = Math.max(280, startWidth + deltaX)
    }

    if (resizeEdge.value === 'left' || resizeEdge.value === 'corner-left') {
      const deltaX = startX - e.clientX
      const newWidth = Math.max(280, startWidth + deltaX)
      dragPosition.value.x = startDragX - deltaX
      panelWidth.value = newWidth
    }

    if (resizeEdge.value === 'bottom' || resizeEdge.value === 'corner' || resizeEdge.value === 'corner-left') {
      const deltaY = e.clientY - startY
      panelHeight.value = Math.min(naturalHeight, Math.max(MIN_HEIGHT, startHeight + deltaY))

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

watch(panelHeight, (value) => {
  if (value && paneRef.value && float.value) {
    paneRef.value.style.maxHeight = `${value}px`
  }
})

watch(panelWidth, (value) => {
  if (value && paneRef.value && float.value) {
    paneRef.value.style.maxWidth = `${value}px`
  }
})

function toggleCollapsed() {
  if (float.value) {
    isCollapsed.value = !isCollapsed.value
  }
}

// Update animation when panel state changes
watch(isCollapsed, async (value) => {
  if (!float.value) {
    // Non-float mode: clear motion inline styles so CSS layout takes over
    await nextTick()
    if (paneRef.value) {
      paneRef.value.style.width = ''
      paneRef.value.style.height = ''
      paneRef.value.style.right = ''
      paneRef.value.style.left = ''
      paneRef.value.style.opacity = '1'
      paneRef.value.style.transform = ''
    }
    return
  }
  if (!value) {
    await nextTick() // Wait for slot to be visible
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

function onFolderOpen(value: boolean) {
  panelHeight.value = panelHeight.value + (CONTROL_HEIGHT * (value ? 1 : -1))
}

const slotsRef = ref()

watch(slotsRef, (value) => {
  panelHeight.value = panelHeight.value + value.clientHeight
})

// Initialize panel after slot content is rendered
onMounted(async () => {
  handleScroll()

  // Wait for slot content to be rendered
  await nextTick()

  isInitialized.value = true

  hasSlots.value = slots?.default ? slots?.default().length > 0 : false
})

// Add cleanup when component is unmounted
onUnmounted(() => {
  dispose(uuid?.value)
})
</script>

<template>
  <div class="tresleches-container">
    <div
      :id="`tres-leches-pane-${uuid}`"
      ref="paneRef"
      class="tl-leches tl-box-border tl-z-24 tl-bg-white dark:tl-bg-dark-200 tl-shadow-xl tl-font-sans tl-flex tl-flex-col tl-rounded-lg tl-overflow-hidden"
      :class="[
        $attrs.class,
        float ? 'tl-absolute tl-top-4' : 'tl-relative',
      ]"
      :style="panelStyle"
    >
      <header
        class="tl-flex tl-items-center tl-text-gray-200 dark:tl-text-gray-600"
        :class="[!isCollapsed && float ? 'tl-justify-between' : 'tl-justify-center']"
      >
        <div v-if="!isCollapsed && float" class="w-1/3"></div>
        <div v-if="!isCollapsed && float" ref="handleRef" class="tl-cursor-grabbing w-1/3">
          <i class="i-ic-baseline-drag-indicator"></i><i class="i-ic-baseline-drag-indicator"></i><i
            class="i-ic-baseline-drag-indicator"
          ></i>
        </div>
        <div class="tl-flex tl-p-0.5" :class="[!isCollapsed && float ? 'tl-justify-end' : 'tl-justify-center']">
          <button
            class="tl-rounded-full
              tl-inline-flex tl-justify-center tl-items-center
              tl-p-1.5
              tl-bg-gray-100
              dark:tl-bg-dark-300
              tl-outline-none
              tl-border-none
              tl-cursor-pointer"
          >
            <img
              :src="iconUrl"
              alt="TresLechesIcon"
              class="
              tl-w-4 tl-h-4 tl-block"
              :width="16"
              :height="16"
              @click="toggleCollapsed"
            />
          </button>
        </div>
      </header>
      <div v-show="!isCollapsed" class="tl-flex-1 tl-relative tl-overflow-hidden tl-py-4">
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
          class="tl-scroll-container tl-h-full tl-overflow-y-auto tl-overflow-x-hidden tl-scrollbar tl-scrollbar-rounded tl-scrollbar-w-4px tl-scrollbar-radius-2 tl-scrollbar-track-radius-4 tl-scrollbar-thumb-radius-4 tl-scrollbar-track-color-gray-100 dark:tl-scrollbar-track-color-dark-300 tl-scrollbar-thumb-color-gray-300 dark:tl-scrollbar-thumb-color-gray-400"
          @scroll="handleScroll"
        >
          <template v-for="(group, folderName) of groupedControls" :key="folderName">
            <Folder v-if="folderName !== 'default'" :label="folderName" :controls="group" @open="onFolderOpen" />
            <template v-if="folderName === 'default'">
              <ControlInput
                v-for="control in group"
                :key="control.label"
                :control="control"
                @change="newValue => onChange(control.key, newValue)"
              />
            </template>
          </template>

          <div v-if="hasSlots" ref="slotsRef" style="padding: 0 var(--tl-h-padding);">
            <slot></slot>
          </div>
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

<style>
.tl-leches {
  --tl-unit-size: 20px;
  --tl-unit-spacing: 4px;
  --tl-h-padding: 4px;
  --tl-v-padding: 4px;
  --tl-blade-radius: 2px;
  --tl-font-size: 11px;
  --tl-panel-width: 280px;
  --tl-input-padding: 0 4px;
  font-size: var(--tl-font-size);
  font-weight: 500;
}

.tl-leches .tl-scroll-container {
  scrollbar-gutter: stable;
}

.tl-leches input,
.tl-leches select {
  height: var(--tl-unit-size);
  line-height: var(--tl-unit-size);
  padding: var(--tl-input-padding);
  border-radius: var(--tl-blade-radius);
  font-size: var(--tl-font-size);
}
</style>
