<script setup lang="ts">
/**
 * Floating contextual handle anchored at the editing decal's screen
 * projection: a draggable centre to move the decal and a radial slider
 * for rotation + scale. Shows a snap-tick overlay when snap is enabled,
 * plus a live readout badge (scale · rotation · layer).
 */
import { computed, inject, nextTick, onBeforeUnmount, reactive, ref, useTemplateRef, watch } from 'vue'
import { useDraggable, useElementSize, useResizeObserver } from '@vueuse/core'
import { DECAL_DEBUG_KEY } from './context'

const ctx = inject(DECAL_DEBUG_KEY)
if (!ctx) { throw new Error('[DecalDebugUI] Handle.vue requires the DecalDebugUI context.') }
const { session, isSnapEnabled, snapAngleDeg, rootRef, commit, cancel } = ctx

const MIN_SCALE = 0.25
const MAX_SCALE = 3.5
const FADE_OUT_MS = 220

const dragRef = useTemplateRef<HTMLDivElement>('dragRef')
const innerRef = useTemplateRef<HTMLDivElement>('innerRef')
const sliderRef = useTemplateRef<HTMLDivElement>('sliderRef')

const currentScale = ref(1)
const currentAngle = ref(-Math.PI / 2)
const isSliderDragging = ref(false)
const dragCenter = reactive({ x: 0, y: 0, radius: 0 })

const isEditing = computed(() => !!session.value?.editingEntry.value)
const editingMode = computed(() => session.value?.editingMode.value ?? null)
const isUpdating = computed(() => editingMode.value === 'update')
const isDraggingTexture = computed(() => session.value?.dragTextureIndex.value !== null)
const editingZIndex = computed(() => session.value?.editingEntry.value?.zIndex ?? null)

const isVisible = computed(() => {
  if (!isEditing.value) { return false }
  if (isDraggingTexture.value) { return false }
  return true
})

const scalePercent = computed(() => `${Math.round(currentScale.value * 100)}%`)
const rotationDeg = computed(() => {
  const deg = (-(currentAngle.value) - Math.PI / 2) * 180 / Math.PI
  return `${Math.round(((deg % 360) + 360) % 360)}°`
})

const { x: xDrag, y: yDrag } = useDraggable(dragRef, {
  initialValue: { x: 0, y: 0 },
  preventDefault: true,
  disabled: computed(() => !isEditing.value),
  onStart(_position, event) {
    if (!isEditing.value) { return false }
    if (sliderRef.value?.contains(event.target as Node)) { return false }
    session.value?.setUiDragging(true)
  },
  onEnd() {
    const s = session.value
    if (!s) { return }
    s.setUiDragging(false)
    // Released off-mesh: commit if updating, cancel if creating.
    if (!s.isCursorOnTarget.value) {
      if (isUpdating.value) { commit() }
      else { cancel() }
    }
  },
})

const { width: widthContainer, height: heightContainer } = useElementSize(dragRef)

// `position` lives in the stylesheet (`position: fixed`) — keep inline
// purely positional so the CSS can stay in charge of the layout mode.
const containerStyle = computed(() => ({
  left: `${xDrag.value}px`,
  top: `${yDrag.value}px`,
}))

const innerStyle = computed(() => ({
  transform: `scale(${currentScale.value})`,
}))

// xDrag / yDrag are in window-coords (handle is `position: fixed`).
// Convert to NDC against the overlay's clientRect — it matches the
// canvas extent in both fullscreen and contained modes.
watch([xDrag, yDrag], () => {
  if (!session.value || !isEditing.value) { return }
  const overlay = rootRef.value
  if (!overlay) { return }
  const rect = overlay.getBoundingClientRect()
  const centerX = xDrag.value + widthContainer.value / 2
  const centerY = yDrag.value + heightContainer.value / 2
  const ndcX = ((centerX - rect.left) / rect.width) * 2 - 1
  const ndcY = -(((centerY - rect.top) / rect.height) * 2 - 1)
  session.value.setCursor(ndcX, ndcY)
})

function updateSliderFromAngle(angle: number) {
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
})

useDraggable(sliderRef, {
  preventDefault: true,
  onStart() {
    if (!isEditing.value || !innerRef.value) { return false }
    isSliderDragging.value = true
    const rect = innerRef.value.getBoundingClientRect()
    dragCenter.x = rect.left + rect.width / 2
    dragCenter.y = rect.top + rect.height / 2
    dragCenter.radius = innerRef.value.offsetWidth / 2
  },
  onMove(_, event) {
    if (!isEditing.value || !session.value) { return }
    const dx = event.clientX - dragCenter.x
    const dy = event.clientY - dragCenter.y
    let angle = Math.atan2(dy, dx)
    if (isSnapEnabled.value) {
      const step = Math.max(1, snapAngleDeg.value)
      const radPerDeg = Math.PI / 180
      let deg = angle / radPerDeg + 90
      deg = Math.round(deg / step) * step
      deg -= 90
      angle = deg * radPerDeg
    }
    const dist = Math.sqrt(dx * dx + dy * dy)
    const scale = Math.min(Math.max(dist / dragCenter.radius, MIN_SCALE), MAX_SCALE)
    currentScale.value = scale
    currentAngle.value = angle
    updateSliderFromAngle(angle)
    session.value.setScale(scale)
    session.value.setAngle(-(angle + Math.PI / 2))
  },
  onEnd() {
    isSliderDragging.value = false
  },
})

async function snapToCurrentEntry() {
  const s = session.value
  if (!s?.editingEntry.value) { return }
  // Snapshot session state synchronously so any reactive effect that
  // mutates `scale`/`angle` during the upcoming nextTick can't race us.
  currentScale.value = s.scale.value
  currentAngle.value = -s.angle.value - Math.PI / 2
  await nextTick()
  updateSliderFromAngle(currentAngle.value)

  const rect = dragRef.value?.getBoundingClientRect()
  const w = rect?.width || widthContainer.value
  const h = rect?.height || heightContainer.value
  const anchor = s.screenAnchor
  xDrag.value = anchor.x - w / 2
  yDrag.value = anchor.y - h / 2
}

// Delay the slider reset until after the opacity fade — without this
// the user briefly sees the transform shrink to defaults mid-fade.
let resetHandle: ReturnType<typeof setTimeout> | null = null
function clearResetTimer() {
  if (resetHandle) { clearTimeout(resetHandle); resetHandle = null }
}

const editingEntryRef = computed(() => session.value?.editingEntry.value ?? null)
watch(editingEntryRef, async (entry) => {
  if (!session.value) { return }
  if (!entry) {
    clearResetTimer()
    resetHandle = setTimeout(() => {
      resetHandle = null
      if (session.value?.editingEntry.value) { return }
      currentScale.value = 1
      currentAngle.value = -Math.PI / 2
      updateSliderFromAngle(currentAngle.value)
    }, FADE_OUT_MS)
    return
  }
  clearResetTimer()
  await snapToCurrentEntry()
})

// Handle was hidden during the texture drag — snap to the placed decal.
watch(isDraggingTexture, async (now, prev) => {
  if (prev && !now && session.value?.editingEntry.value) {
    await snapToCurrentEntry()
  }
})

onBeforeUnmount(clearResetTimer)

const snapTicks = computed(() => {
  const step = Math.max(1, snapAngleDeg.value)
  return Array.from({ length: Math.floor(360 / step) }, (_, i) => i * step)
})
</script>

<template>
  <div
    class="handle-wrapper"
    :class="isVisible ? 'is-visible' : ''"
  >
    <div
      ref="dragRef"
      :style="containerStyle"
      class="handle-area"
      :class="isVisible ? 'is-active' : ''"
    >
      <div
        ref="innerRef"
        :style="innerStyle"
        class="handle-inner"
      >
        <div v-show="isSnapEnabled" class="snap-vignette" aria-hidden="true"></div>

        <svg
          v-show="isSnapEnabled"
          class="snap-ticks"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <g
            v-for="(angle, i) in snapTicks"
            :key="i"
            :transform="`rotate(${angle} 50 50)`"
          >
            <line
              x1="50"
              y1="2"
              x2="50"
              :y2="angle % 90 === 0 ? 8 : 5.5"
              stroke="white"
              :stroke-width="angle % 90 === 0 ? 1.6 : 1.1"
              stroke-linecap="round"
            />
          </g>
        </svg>

        <div class="circle-center"></div>
        <div class="circle-ring"></div>

        <div ref="sliderRef" class="slider-anchor">
          <div
            class="slider-handle"
            :class="{ 'is-dragging': isSliderDragging }"
          ></div>
        </div>
      </div>

      <div v-if="isEditing" class="live-badge">
        <span class="live-badge__scale">{{ scalePercent }}</span>
        <span class="live-badge__sep">·</span>
        <span>{{ rotationDeg }}</span>
        <template v-if="editingZIndex !== null">
          <span class="live-badge__sep">·</span>
          <span class="live-badge__layer">L{{ editingZIndex }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
