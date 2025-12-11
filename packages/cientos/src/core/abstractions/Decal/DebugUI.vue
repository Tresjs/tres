<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef, watch } from 'vue'
import { onKeyStroke, useDraggable, useElementSize, useEventListener, useResizeObserver } from '@vueuse/core'
import { decalBus } from './DecalBus'

const SNAP_INCREMENT_DEG = 15
const MIN_SCALE = 0.25
const MAX_SCALE = 3.5
const UI_Z_INDEX = 1000000

const dragRef = useTemplateRef<HTMLDivElement>('dragRef')
const innerRef = useTemplateRef<HTMLDivElement>('innerRef')
const sliderRef = useTemplateRef<HTMLDivElement>('sliderRef')
const selectorRef = useTemplateRef<HTMLDivElement>('selectorRef')

const cursorPosition = reactive<{ x: number, y: number }>({ x: 0, y: 0 })
const dragCenter = reactive({ x: 0, y: 0, radius: 0 })

const currentScale = ref(1)
const currentAngle = ref(0)
const isSliderDragging = ref(false)
const isSnapEnabled = ref(false)

const isVisibleCurrentIntersect = ref(false)
const isVisibleDecalIntersect = ref(false)
const currentEditingId = ref<string | null>(null)
const hasMultipleTextures = ref(false)

const disabledTest = computed(() => !isVisibleDecalIntersect.value)

const containerStyle = computed(() => ({
  position: 'absolute' as const,
  left: `${xDrag.value}px`,
  top: `${yDrag.value}px`,
}))

const innerStyle = computed(() => ({
  transform: `scale(${currentScale.value})`,
}))

const { x: xDrag, y: yDrag } = useDraggable(dragRef, {
  initialValue: { x: 0, y: 0 },
  preventDefault: true,
  disabled: disabledTest,
  onStart(position, event) {
    if (!isVisibleDecalIntersect.value) { return false }
    const target = event.target as Node
    if (sliderRef.value?.contains(target)) { return false }
    if (selectorRef.value?.contains(target)) { return false }
  },
})

const { width: widthContainer, height: heightContainer } = useElementSize(dragRef)

watch([xDrag, yDrag], () => {
  const centerX = xDrag.value + widthContainer.value / 2
  const centerY = yDrag.value + heightContainer.value / 2
  const nx = centerX / window.innerWidth * 2 - 1
  const ny = -(centerY / window.innerHeight * 2 - 1)
  decalBus.emit({ type: 'drag-ui', x: nx, y: ny })
})

const updateSliderFromAngle = (angle: number) => {
  if (!sliderRef.value || !innerRef.value) { return }
  const radius = innerRef.value.offsetWidth / 2
  const sliderX = Math.cos(angle) * radius
  const sliderY = Math.sin(angle) * radius
  const rotation = angle * 180 / Math.PI + 90
  sliderRef.value.style.transform = `translate(-50%, -50%) translate(${sliderX}px, ${sliderY}px) rotate(${rotation}deg)`
}

useResizeObserver(innerRef, () => {
  if (!innerRef.value) { return }
  const rect = innerRef.value.getBoundingClientRect()
  dragCenter.x = rect.left + rect.width / 2
  dragCenter.y = rect.top + rect.height / 2
  dragCenter.radius = innerRef.value.offsetWidth / 2

  if (currentAngle.value === 0) {
    currentAngle.value = -Math.PI / 2
    updateSliderFromAngle(currentAngle.value)
  }
})

useDraggable(sliderRef, {
  preventDefault: true,
  onStart() {
    if (!isVisibleDecalIntersect.value || !innerRef.value) { return false }
    isSliderDragging.value = true

    const rect = innerRef.value.getBoundingClientRect()
    dragCenter.x = rect.left + rect.width / 2
    dragCenter.y = rect.top + rect.height / 2
    dragCenter.radius = innerRef.value.offsetWidth / 2
  },
  onMove(_, event) {
    if (!isVisibleDecalIntersect.value || !innerRef.value) { return }
    const dx = event.clientX - dragCenter.x
    const dy = event.clientY - dragCenter.y

    let angle = Math.atan2(dy, dx)

    if (isSnapEnabled.value) {
      const radPerDeg = Math.PI / 180
      let deg = angle / radPerDeg
      deg += 90
      deg = Math.round(deg / SNAP_INCREMENT_DEG) * SNAP_INCREMENT_DEG
      deg -= 90
      angle = deg * radPerDeg
    }

    const dist = Math.sqrt(dx * dx + dy * dy)
    let scale = dist / dragCenter.radius
    scale = Math.min(Math.max(scale, MIN_SCALE), MAX_SCALE)

    currentScale.value = scale
    currentAngle.value = angle
    updateSliderFromAngle(angle)

    decalBus.emit({ type: 'drag-ui-scale', scale })
    decalBus.emit({ type: 'drag-ui-orientation', angle })
  },
  onEnd() {
    isSliderDragging.value = false
  },
})

const toggleSnap = () => { isSnapEnabled.value = !isSnapEnabled.value }
const exportData = () => { decalBus.emit({ type: 'request-export' }) }

const onPrevTexture = () => {
  if (!isVisibleDecalIntersect.value) { return }
  decalBus.emit({ type: 'change-texture', direction: -1 })
}

const onNextTexture = () => {
  if (!isVisibleDecalIntersect.value) { return }
  decalBus.emit({ type: 'change-texture', direction: 1 })
}

const onValidateDecal = () => {
  decalBus.emit({ type: 'validate-decal' })
  isVisibleDecalIntersect.value = false
}

const onCancelEdit = () => {
  decalBus.emit({ type: 'cancel-edit' })
  isVisibleDecalIntersect.value = false
}

const onDeleteDecal = () => {
  if (!currentEditingId.value) { return }
  decalBus.emit({ type: 'delete-decal' })
  isVisibleDecalIntersect.value = false
}

const onZIndexChange = (delta: number) => {
  if (!currentEditingId.value) { return }
  decalBus.emit({ type: 'change-zindex', id: currentEditingId.value, delta })
}

useEventListener(window, 'pointerdown', (event) => {
  if (!isVisibleDecalIntersect.value || !dragRef.value) { return }
  if (dragRef.value.contains(event.target as Node)) { return }

  if (currentEditingId.value) {
    onValidateDecal()
  }
  else {
    onCancelEdit()
  }
})

onKeyStroke('Enter', (e) => {
  if (!isVisibleDecalIntersect.value) { return }
  e.preventDefault()
  onValidateDecal()
})

onKeyStroke('Escape', (e) => {
  if (!isVisibleDecalIntersect.value) { return }
  e.preventDefault()
  onCancelEdit()
})

onKeyStroke(['Delete', 'Backspace'], (e) => {
  if (!isVisibleDecalIntersect.value) { return }
  e.preventDefault()
  if (currentEditingId.value) { onDeleteDecal() }
  else { onCancelEdit() }
})

const stopBus = decalBus.on(async (payload) => {
  switch (payload.type) {
    case 'cursor-move': {
      const px = (payload.x + 1) / 2 * window.innerWidth
      const py = (1 - payload.y) / 2 * window.innerHeight
      cursorPosition.x = px - widthContainer.value / 2
      cursorPosition.y = py - heightContainer.value / 2
      break
    }
    case 'click':
      isVisibleDecalIntersect.value = true
      currentEditingId.value = null
      hasMultipleTextures.value = (payload.textureCount ?? 0) > 1
      xDrag.value = cursorPosition.x
      yDrag.value = cursorPosition.y
      break
    case 'ui-toggle-visibility-current-intersect':
      isVisibleCurrentIntersect.value = payload.visible
      break
    case 'ui-toggle-visibility-decal-intersect':
      isVisibleDecalIntersect.value = payload.visible
      break
    case 'set-ui-state':
      currentScale.value = payload.scale
      currentAngle.value = payload.angle
      xDrag.value = payload.x - widthContainer.value / 2
      yDrag.value = payload.y - heightContainer.value / 2
      currentEditingId.value = payload.id
      hasMultipleTextures.value = (payload.textureCount ?? 0) > 1
      await nextTick()
      updateSliderFromAngle(payload.angle)
      break
  }
})

watch(isVisibleDecalIntersect, (visible) => {
  if (!visible) {
    currentScale.value = 1
    currentAngle.value = -Math.PI / 2
    updateSliderFromAngle(currentAngle.value)
  }
})

onMounted(() => {
  updateSliderFromAngle(-Math.PI / 2)
})

onBeforeUnmount(stopBus)
</script>

<template>
  <div
    class="fixed transition-opacity duration-200 pointer-events-none"
    :class="isVisibleDecalIntersect ? 'opacity-100' : 'opacity-0'"
    :style="{ zIndex: UI_Z_INDEX }"
  >
    <div
      ref="dragRef"
      :style="containerStyle"
      class="absolute w-[25vw] h-auto aspect-square"
      :class="isVisibleDecalIntersect ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <div
        ref="innerRef"
        :style="innerStyle"
        class="relative w-full h-full will-change-transform origin-center hover:cursor-grab group"
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 aspect-square bg-white rounded-full shadow-[0_0_6px_rgba(0,0,0,0.9)]"></div>

        <div class="absolute inset-0 w-full h-full outline outline-4 outline-white rounded-full shadow-[0_0_3px_rgba(0,0,0,0.5),inset_0_0_3px_rgba(0,0,0,0.5)]"></div>

        <div
          ref="sliderRef"
          class="absolute top-1/2 left-1/2 w-10 h-2.5 origin-center z-[9999] group-active:cursor-grabbing cursor-grab"
        >
          <div class="bg-white w-full h-full shadow-[0_0_3px_rgba(0,0,0,0.5)] rounded-[3px]"></div>
        </div>
      </div>

      <div
        ref="selectorRef"
        class="absolute left-1/2 top-[105%] -translate-x-1/2 flex flex-col items-center gap-3 w-max z-[1000001]"
        :class="isVisibleDecalIntersect ? 'pointer-events-auto' : 'pointer-events-none'"
      >
        <div class="flex items-center gap-2 p-2 bg-white/90 border border-gray-200 shadow-xl backdrop-blur-xl rounded-full">
          <button
            class="w-8 h-8 flex items-center justify-center rounded-full text-md transition"
            :class="[isSnapEnabled ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'text-gray-500 hover:bg-gray-100']"
            title="Toggle Snap"
            @click="toggleSnap"
          >
            🧲
          </button>

          <button
            v-if="currentEditingId"
            class="px-3 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold hover:bg-gray-100"
            @click="exportData"
          >
            Export
          </button>

          <div v-if="hasMultipleTextures" class="flex items-center gap-1 mx-1">
            <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600" @click="onPrevTexture">
              &lt;
            </button>
            <span class="text-xl select-none">🎨</span>
            <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600" @click="onNextTexture">
              &gt;
            </button>
          </div>

          <button
            class="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-100 rounded-full"
            title="Cancel"
            @click="onCancelEdit"
          >
            ❌
          </button>

          <button
            class="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white"
            title="Confirm"
            @click="onValidateDecal"
          >
            ✅
          </button>
        </div>

        <div
          v-if="currentEditingId"
          class="flex items-center gap-2 px-3 py-1 bg-white/90 border border-gray-200 shadow-lg backdrop-blur-xl rounded-full text-gray-700"
        >
          <button
            class="w-9 h-9 text-lg flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 shadow"
            title="Delete"
            @click="onDeleteDecal"
          >
            🗑️
          </button>

          <div class="w-px h-6 bg-gray-300"></div>

          <span class="font-semibold text-sm">Layer</span>

          <div class="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            <button class="w-8 h-8 rounded-full hover:bg-white shadow" @click="onZIndexChange(-1)">-</button>
            <button class="w-8 h-8 rounded-full hover:bg-white shadow" @click="onZIndexChange(1)">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
