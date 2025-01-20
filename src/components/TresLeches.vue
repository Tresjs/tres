<script setup lang="ts">
import { computed, onUnmounted, ref, toRefs, watch } from 'vue'
import { useDark, useDraggable, useWindowSize } from '@vueuse/core'
import { dispose, useControlsProvider } from '../composables/useControls'
import type { LechesControl } from '../types'
import Folder from './Folder.vue'
import { useMotion } from '@vueuse/motion'
import ControlInput from './ControlInput.vue'

const props = withDefaults(defineProps<{
  uuid?: string
  collapsed?: boolean
}>(), {
  uuid: 'default',
  collapsed: false,
})

const { uuid, collapsed } = toRefs(props)

const isCollapsed = ref(collapsed.value)
const isHover = ref(false)

const { width } = useWindowSize()

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 340

const panelWidth = ref(DEFAULT_WIDTH)
const panelHeight = ref(DEFAULT_HEIGHT)
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
    right: '16px',
    left: 'auto',
  },
  enter: {
    opacity: 1,
    y: 0,
    width: 28,
    height: 28,
    right: '16px',
    left: 'auto',
  },
  leave: {
    opacity: 0,
    y: 100,
    width: 28,
    height: 28,
    right: '16px',
    left: 'auto',
  },
})

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
      panelHeight.value = Math.max(280, startHeight + deltaY)
      paneRef.value.style.maxHeight = `${panelHeight.value}px`
    }
  }

  function onMouseUp() {
    isResizing.value = false
    resizeEdge.value = null
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
      right: '16px',
      left: 'auto',
    })
    return
  }
  await apply('enter')
}, { immediate: true })

useDark({
  selector: `.tresleches-container`,
  valueDark: 'dark',
  valueLight: 'light',
})
</script>

<template>
  <div class="tresleches-container">
    <div
      :id="`tres-leches-pane-${uuid}`"
      ref="paneRef"
      class="tl-fixed tl-top-4 tl-z-24 tl-bg-white dark:tl-bg-dark-200 tl-shadow-xl tl-p-1 tl-font-sans tl-text-xs tl-flex tl-flex-col"
      :class="[$attrs.class, isCollapsed ? 'tl-rounded-full' : 'tl-rounded-lg']"
      :style="[style, { width: `${panelWidth}px`, height: `${panelHeight}px`, right: '16px', left: 'auto' }]"
    >
      <header class="tl-flex tl-justify-between tl-items-center tl-text-gray-200 dark:tl-text-gray-600 tl-text-xs tl-flex-none">
        <div v-show="!isCollapsed" class="w-1/3"></div>
        <div v-show="!isCollapsed" ref="handleRef" class="tl-cursor-grabbing">
          <i class="i-ic-baseline-drag-indicator"></i><i class="i-ic-baseline-drag-indicator"></i><i
            class="i-ic-baseline-drag-indicator"
          ></i>
        </div>
        <div></div>
        <i
          class="tl-h-4
              tl-w-4
              tl-p-1.5
              tl-flex
              tl-items-center
              tl-line-height-0
              tl-rounded-full
              tl-bg-gray-100
              dark:tl-bg-dark-300
              tl-text-xs
              tl-cursor-pointer"
          @click="isCollapsed = !isCollapsed"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
        >🍰</i>
      </header>
      <div v-if="!isCollapsed" class="tl-flex-1 tl-overflow-y-auto tl-overflow-x-hidden tl-my-4 tl-scrollbar tl-scrollbar-rounded tl-scrollbar-w-4px tl-scrollbar-radius-2 tl-scrollbar-track-radius-4 tl-scrollbar-thumb-radius-4">
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
