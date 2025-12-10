<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef, watch } from 'vue'
import { onClickOutside, useDraggable, useElementSize, useEventListener, useResizeObserver } from '@vueuse/core'
import { decalBus } from './DecalBus'

const dragRef = useTemplateRef<HTMLDivElement>('dragRef')
const innerRef = useTemplateRef<HTMLDivElement>('innerRef')
const sliderRef = useTemplateRef<HTMLDivElement>('sliderRef')
const selectorRef = useTemplateRef<HTMLDivElement>('selectorRef')

const cursorPosition = reactive<{ x: number, y: number }>({ x: 0, y: 0 })
const currentScale = ref(1)
const currentAngle = ref(0)
const isSliderDragging = ref(false)
const isVisibleCurrentIntersect = ref(false)
const isVisibleDecalIntersect = ref(false)
const currentEditingId = ref<string | null>(null)
const hasMultipleTextures = ref(false)
const dragCenter = { x: 0, y: 0, radius: 0 }
const SNAP_INCREMENT_DEG = 15
const isSnapEnabled = ref(false)

function updateSliderFromAngle(angle: number) {
  if (!sliderRef.value || !innerRef.value) { return }
  const radius = innerRef.value.offsetWidth / 2
  const sliderX = Math.cos(angle) * radius
  const sliderY = Math.sin(angle) * radius
  const rotation = angle * 180 / Math.PI + 90
  sliderRef.value.style.transform = `translate(-50%, -50%) translate(${sliderX}px, ${sliderY}px) rotate(${rotation}deg)`
}

const disabledTest = computed(() => !isVisibleDecalIntersect.value)

const { x: xDrag, y: yDrag } = useDraggable(dragRef, {
  initialValue: { x: 0, y: 0 },
  preventDefault: true,
  disabled: disabledTest,
  onStart(position, event) {
    if (!isVisibleDecalIntersect.value) { return false }
    if (sliderRef.value && sliderRef.value.contains(event.target as Node)) { return false }
    if (selectorRef.value && selectorRef.value.contains(event.target as Node)) { return false }
  },
})

const containerStyle = computed(() => ({
  position: 'absolute',
  left: `${xDrag.value}px`,
  top: `${yDrag.value}px`,
}))

const innerStyle = computed(() => ({
  width: '100%',
  height: '100%',
  transform: `scale(${currentScale.value})`,
}))

function onPrevTexture() {
  if (!isVisibleDecalIntersect.value) { return }
  decalBus.emit({ type: 'change-texture', direction: -1 })
}

function onNextTexture() {
  if (!isVisibleDecalIntersect.value) { return }
  decalBus.emit({ type: 'change-texture', direction: 1 })
}

useResizeObserver(innerRef, () => {
  if (!innerRef.value) { return }
  const rect = innerRef.value.getBoundingClientRect()
  dragCenter.x = rect.left + rect.width / 2
  dragCenter.y = rect.top + rect.height / 2
  dragCenter.radius = innerRef.value.offsetWidth / 2
  currentAngle.value = -Math.PI / 2
  updateSliderFromAngle(currentAngle.value)
})

useDraggable(sliderRef, {
  preventDefault: true,
  onStart(_, event) {
    if (!isVisibleDecalIntersect.value) { return false }
    isSliderDragging.value = true
    if (innerRef.value) {
      const rect = innerRef.value.getBoundingClientRect()
      dragCenter.x = rect.left + rect.width / 2
      dragCenter.y = rect.top + rect.height / 2
      dragCenter.radius = innerRef.value.offsetWidth / 2
    }
  },
  onMove(_, event) {
    if (!isVisibleDecalIntersect.value || !innerRef.value) { return }
    const dx = event.clientX - dragCenter.x
    const dy = event.clientY - dragCenter.y

    let angle = Math.atan2(dy, dx)

    if (isSnapEnabled.value) {
      let deg = angle * (180 / Math.PI)

      deg += 90

      deg = Math.round(deg / SNAP_INCREMENT_DEG) * SNAP_INCREMENT_DEG

      deg -= 90

      angle = deg * (Math.PI / 180)
    }

    const dist = Math.sqrt(dx * dx + dy * dy)
    let scale = dist / dragCenter.radius
    scale = Math.min(Math.max(scale, 0.25), 3.5)

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

function toggleSnap() {
  isSnapEnabled.value = !isSnapEnabled.value
}

const { width: widthContainer, height: heightContainer } = useElementSize(dragRef)

watch([xDrag, yDrag], () => {
  const centerX = xDrag.value + widthContainer.value / 2
  const centerY = yDrag.value + heightContainer.value / 2
  const nx = centerX / window.innerWidth * 2 - 1
  const ny = -(centerY / window.innerHeight * 2 - 1)
  decalBus.emit({ type: 'drag-ui', x: nx, y: ny })
})

function onCreateDecal() {
  xDrag.value = cursorPosition.x
  yDrag.value = cursorPosition.y
}

function exportData() {
  decalBus.emit({ type: 'request-export' })
}

function onValidateDecal() {
  decalBus.emit({ type: 'validate-decal' })
  isVisibleDecalIntersect.value = false
}

function onCancelEdit() {
  decalBus.emit({ type: 'cancel-edit' })
  isVisibleDecalIntersect.value = false
}

function onDeleteDecal() {
  if (!currentEditingId.value) { return }
  decalBus.emit({ type: 'delete-decal' })
  isVisibleDecalIntersect.value = false
}

function onZIndexUp() {
  if (!currentEditingId.value) { return }
  decalBus.emit({ type: 'change-zindex', id: currentEditingId.value, delta: +1 })
}

function onZIndexDown() {
  if (!currentEditingId.value) { return }
  decalBus.emit({ type: 'change-zindex', id: currentEditingId.value, delta: -1 })
}

// onClickOutside(dragRef, () => {
//   if (!isVisibleDecalIntersect.value) { return }
//   console.log('here ')

//   if (currentEditingId.value) {
//     onValidateDecal()
//   }
//   else {
//     onCancelEdit()
//   }
// })

useEventListener(window, 'pointerdown', (event) => {
  if (!isVisibleDecalIntersect.value) { return }

  if (!dragRef.value) { return }

  const target = event.target as Node
  if (dragRef.value.contains(target)) { return }

  if (currentEditingId.value) {
    onValidateDecal()
  }
  else {
    onCancelEdit()
  }
})

const stop = decalBus.on(async (payload) => {
  if (payload.type === 'cursor-move') {
    const px = (payload.x + 1) / 2 * window.innerWidth
    const py = (1 - payload.y) / 2 * window.innerHeight
    cursorPosition.x = px - widthContainer.value / 2
    cursorPosition.y = py - heightContainer.value / 2
  }
  if (payload.type === 'click') {
    isVisibleDecalIntersect.value = true
    currentEditingId.value = null
    hasMultipleTextures.value = (payload.textureCount ?? 0) > 1
    onCreateDecal()
  }
  if (payload.type === 'ui-toggle-visibility-current-intersect') { isVisibleCurrentIntersect.value = payload.visible }
  if (payload.type === 'ui-toggle-visibility-decal-intersect') { isVisibleDecalIntersect.value = payload.visible }
  if (payload.type === 'set-ui-state') {
    currentScale.value = payload.scale
    currentAngle.value = payload.angle
    xDrag.value = payload.x - widthContainer.value / 2
    yDrag.value = payload.y - heightContainer.value / 2
    currentEditingId.value = payload.id
    hasMultipleTextures.value = (payload.textureCount ?? 0) > 1
    await nextTick()
    updateSliderFromAngle(payload.angle)
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

onBeforeUnmount(stop)
</script>

<template>
  <div
    :class="{ hide: !isVisibleDecalIntersect }"
    class="cientos-decal-debug-ui__inner-wrapper"
  >
    <div ref="dragRef" :style="containerStyle" class="cientos-decal-debug-ui__drag-container">
      <div ref="innerRef" :style="innerStyle" class="cientos-decal-debug-ui__inner group">
        <div class="cientos-decal-debug-ui__dot-center"></div>
        <div class="cientos-decal-debug-ui__border"></div>
        <div ref="sliderRef" class="cientos-decal-debug-ui__slider group-active:cursor-grabbing cursor-grab">
          <div class="cientos-decal-debug-ui__slider-inner"></div>
        </div>
      </div>

      <div ref="selectorRef" class="absolute left-1/2 -translate-x-1/2 top-[105%] flex flex-col items-center gap-3 w-max pointer-events-none z-[1000001]">
        <div class="pointer-events-auto flex items-center gap-2 p-2 bg-white/90 backdrop-blur-md rounded-full border border-gray-200 shadow-xl">
          <button
            class="w-9 h-9 flex items-center justify-center rounded-full transition-colors text-lg"
            :class="isSnapEnabled ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'hover:bg-gray-100 text-gray-500'"
            title="Snap Angle (15°)"
            @click="toggleSnap"
          >
            🧲
          </button>

          <button
            class="px-4 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors border border-transparent hover:border-gray-200"
            @click="exportData"
          >
            Export
          </button>

          <div class="w-px h-5 bg-gray-300 mx-1"></div>

          <div v-if="hasMultipleTextures" class="flex items-center gap-2">
            <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 font-bold text-gray-500 transition-colors" @click="onPrevTexture">&lt;</button>
            <span class="text-xl select-none">🎨</span>
            <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 font-bold text-gray-500 transition-colors" @click="onNextTexture">&gt;</button>
            <div class="w-px h-5 bg-gray-300 mx-1"></div>
          </div>

          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-100 text-red-500 transition-colors text-sm font-bold" @click="onCancelEdit">❌</button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-sm transition-colors text-sm font-bold" @click="onValidateDecal">✅</button>
        </div>

        <div v-if="currentEditingId" class="pointer-events-auto flex items-center gap-2 p-2 bg-white/90 backdrop-blur-md rounded-full border border-gray-200 shadow-lg text-gray-600">
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-100 text-red-500 transition-colors text-sm" @click="onDeleteDecal">🗑️</button>

          <div class="w-px h-5 bg-gray-300 mx-1"></div>

          <span class="text-[11px] font-bold uppercase text-gray-500 px-2 select-none tracking-wide">Layer</span>

          <div class="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            <button class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-xs font-bold transition-all shadow-sm" @click="onZIndexDown">-</button>
            <button class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-xs font-bold transition-all shadow-sm" @click="onZIndexUp">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cientos-decal-debug-ui__inner-wrapper {
  position: fixed;
  z-index: 1000000;

  &.hide {
    opacity: 0;

    .cientos-decal-debug-ui__drag-container {
      pointer-events: none;
    }
  }
}

.cientos-decal-debug-ui__drag-container {
  position: absolute;
  width: 25vw;
  height: auto;
  aspect-ratio: 1/ 1;
  margin: 5px;
  pointer-events: auto;
}

.cientos-decal-debug-ui__inner {
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transform-origin: center center;
}

.cientos-decal-debug-ui__inner:hover {
  cursor: grab;

  /* .cientos-decal-debug-ui__dot-center {
    transform: translate(-50%, -50%) scale(1);
  } */
}

.cientos-decal-debug-ui__border {
  position: absolute;
  width: 100%;
  height: 100%;
  outline: 4px solid white;
  border-radius: 500%;
  box-shadow:
    0 0 3px #00000080,
    inset 0 0 3px #00000080;
}

.cientos-decal-debug-ui__dot-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 10px;
  height: auto;
  aspect-ratio: 1 / 1;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 6px #000000e6;
  transition: transform 0.3s ease;
}

.cientos-decal-debug-ui__selector {
  position: absolute;
  left: 100%;
  bottom: 0;
  display: flex;
}

.cientos-decal-debug-ui__selector-item {
  background: #ffffffcc;
  padding: 4px 8px;
  margin-left: 4px;
  border-radius: 4px;
  box-shadow: 0 0 3px #00000080;
  font-size: 12px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
}

.cientos-decal-debug-ui__slider {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 10px;
  transform-origin: center center;
  pointer-events: none;
  pointer-events: auto;
  z-index: 9999;
  /* overflow: hidden; */
}

.cientos-decal-debug-ui__slider-inner {
  background-color: white;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 3px #00000080;
  border-radius: 3px;
}
</style>
