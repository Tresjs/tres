<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

// Both layers render the same panel id, so they share state and stay in sync while
// the user edits whichever side is visible.
useControls({
  visible: true,
  intensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
  color: '#44bda2',
  shadows: { value: 'soft', options: ['none', 'basic', 'soft'] },
}, { uuid: 'demo-theme' })

const containerRef = ref<HTMLElement | null>(null)
const split = ref(50)
const isDragging = ref(false)

function setSplitFromPointer(event: PointerEvent) {
  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect) { return }
  split.value = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100))
}

function onPointerDown(event: PointerEvent) {
  isDragging.value = true
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  setSplitFromPointer(event)
}

function onPointerMove(event: PointerEvent) {
  if (isDragging.value) { setSplitFromPointer(event) }
}

function onKeydown(event: KeyboardEvent) {
  const step = event.shiftKey ? 10 : 2
  if (event.key === 'ArrowLeft') { split.value = Math.max(0, split.value - step) }
  else if (event.key === 'ArrowRight') { split.value = Math.min(100, split.value + step) }
  else { return }
  event.preventDefault()
}
</script>

<template>
  <div
    ref="containerRef"
    class="relative my-6 min-h-[400px] overflow-hidden rounded-lg border border-default select-none"
    :class="{ 'cursor-ew-resize': isDragging }"
  >
    <ClientOnly>
      <div class="light absolute inset-0 isolate flex items-center justify-center bg-muted pattern-dot-bg p-8">
        <div class="w-[280px] max-w-full">
          <TresLeches uuid="demo-theme" :float="false" />
        </div>
      </div>
      <!-- clip-path also clips hit testing, so each side stays interactive where it shows -->
      <div
        class="dark absolute inset-0 isolate flex items-center justify-center bg-muted pattern-dot-bg p-8"
        :style="{ clipPath: `inset(0 0 0 ${split}%)` }"
      >
        <div class="w-[280px] max-w-full">
          <TresLeches uuid="demo-theme" :float="false" />
        </div>
      </div>

      <div
        class="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-primary"
        :style="{ left: `${split}%` }"
      >
        <button
          type="button"
          role="slider"
          aria-label="Compare light and dark theme"
          :aria-valuenow="Math.round(split)"
          aria-valuemin="0"
          aria-valuemax="100"
          class="absolute top-1/2 left-1/2 flex size-9 -translate-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full bg-primary text-inverted shadow-lg ring-4 ring-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="isDragging = false"
          @pointercancel="isDragging = false"
          @keydown="onKeydown"
        >
          <UIcon name="i-lucide-move-horizontal" class="size-4" />
        </button>
      </div>

      <template #fallback>
        <div class="flex min-h-[400px] items-center justify-center bg-muted/50">
          <div class="h-28 w-[280px] max-w-full animate-pulse rounded-md bg-elevated"></div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
