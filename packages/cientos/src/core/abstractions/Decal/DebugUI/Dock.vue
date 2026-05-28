<script setup lang="ts">
/**
 * Bottom-fixed dock — split in two visual rows:
 *   1. (always visible while textures exist) mode badge + texture picker
 *      + export. Texture thumbnails are draggable onto the canvas; they
 *      are also clickable to select-then-place.
 *   2. (only while editing) snap / flip / layer / delete / cancel / confirm.
 */
import { computed, inject, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import { DECAL_DEBUG_KEY, getTextureLabel, getTextureSrc } from './context'

const ctx = inject(DECAL_DEBUG_KEY)
if (!ctx) { throw new Error('[DecalDebugUI] Dock.vue requires the DecalDebugUI context.') }
const { session, hasData, textures, isSnapEnabled, commit, cancel, remove, exportLayout, importLayoutFromFile } = ctx

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef')
const tintWrapperRef = useTemplateRef<HTMLDivElement>('tintWrapperRef')

function openImportDialog() { fileInputRef.value?.click() }

function onImportFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) { importLayoutFromFile(file) }
  // Reset so re-selecting the same file fires `change` again.
  input.value = ''
}

const isEditing = computed(() => !!session.value?.editingEntry.value)
const editingMode = computed(() => session.value?.editingMode.value ?? null)
const isUpdating = computed(() => editingMode.value === 'update')
const textureIndex = computed(() => session.value?.textureIndex.value ?? 0)
const dragTextureIndex = computed(() => session.value?.dragTextureIndex.value ?? null)
const isDraggingTexture = computed(() => dragTextureIndex.value !== null)
const editingFlipX = computed(() => session.value?.editingEntry.value?.flipX ?? false)
const editingFlipY = computed(() => session.value?.editingEntry.value?.flipY ?? false)
const editingZIndex = computed(() => session.value?.editingEntry.value?.zIndex ?? null)

const editingColor = computed(() => session.value?.editingEntry.value?.color ?? null)
const editingOpacity = computed(() => session.value?.editingEntry.value?.opacity ?? null)
const hasCustomTint = computed(() => editingColor.value !== null || editingOpacity.value !== null)
const colorInputValue = computed(() => editingColor.value ?? '#ffffff')
const opacityInputValue = computed(() => editingOpacity.value ?? 1)
const opacityDisplay = computed(() => {
  const o = editingOpacity.value
  return o === null ? '100%' : `${Math.round(o * 100)}%`
})

const isTintOpen = ref(false)
function toggleTint() {
  if (!isTintOpen.value) {
    // <input type='color'> doesn't fire `input` when the user re-picks
    // the value already shown — so opening the popover with no color set
    // would leave white un-selectable until they pick *anything else*
    // first. Pre-commit the displayed default to seed the active state.
    const s = session.value
    if (s && s.editingEntry.value && s.editingEntry.value.color === null) {
      s.setColor(colorInputValue.value)
    }
  }
  isTintOpen.value = !isTintOpen.value
}
function onColorChange(event: Event) {
  session.value?.setColor((event.target as HTMLInputElement).value)
}
function onOpacityChange(event: Event) {
  session.value?.setOpacity(Number((event.target as HTMLInputElement).value))
}
function resetTint() {
  session.value?.setColor(null)
  session.value?.setOpacity(null)
}

// Close the popover when clicking outside, when the edit ends, or on Esc.
function onDocClick(event: MouseEvent) {
  if (!isTintOpen.value) { return }
  const root = tintWrapperRef.value
  if (root && !root.contains(event.target as Node)) { isTintOpen.value = false }
}
if (typeof document !== 'undefined') {
  document.addEventListener('mousedown', onDocClick)
  onBeforeUnmount(() => { document.removeEventListener('mousedown', onDocClick) })
}
watch(isEditing, (now) => { if (!now) { isTintOpen.value = false } })

// Disabled mid-edit — would race the live editingEntry mutations.
const canUndo = computed(() => !!session.value?.canUndo.value && !isEditing.value)
const canRedo = computed(() => !!session.value?.canRedo.value && !isEditing.value)
function undo() { session.value?.undo() }
function redo() { session.value?.redo() }

const isVisible = computed(() => isEditing.value || isDraggingTexture.value || textures.value.length > 0)

function selectTexture(i: number) { session.value?.setTextureIndex(i) }
function toggleSnap() { isSnapEnabled.value = !isSnapEnabled.value }
function toggleFlipX() { session.value?.toggleFlipX() }
function toggleFlipY() { session.value?.toggleFlipY() }
function changeZIndex(delta: number) { session.value?.changeZIndex(delta) }

function onThumbDragStart(event: DragEvent, i: number) {
  const s = session.value
  if (!s) { return }
  // A drag takes over any in-progress edit.
  if (s.editingEntry.value) { s.cancel() }
  s.setTextureIndex(i)
  s.setDragTextureIndex(i)
  if (!event.dataTransfer) { return }
  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData('text/plain', String(i))

  // Custom drag ghost: clone the source thumb (frame + image), keep it in
  // the original parent so the `.cientos-decal-ui` cascade still styles
  // it, and apply opacity. Off-screen until the browser snapshots it.
  const source = event.currentTarget as HTMLElement | null
  const parent = source?.parentElement
  if (source && parent) {
    const ghost = source.cloneNode(true) as HTMLElement
    ghost.style.opacity = '0.1'
    ghost.style.position = 'fixed'
    ghost.style.top = '-9999px'
    ghost.style.left = '-9999px'
    ghost.style.pointerEvents = 'none'
    parent.appendChild(ghost)
    const rect = source.getBoundingClientRect()
    event.dataTransfer.setDragImage(ghost, rect.width / 2, rect.height / 2)
    setTimeout(() => { ghost.remove() }, 0)
  }
}

function onThumbDragEnd(event: DragEvent) {
  const s = session.value
  if (!s) { return }
  // dropEffect === 'none' means aborted (off-canvas / Esc).
  if (event.dataTransfer?.dropEffect === 'none' && s.editingMode.value === 'create') {
    s.cancel()
  }
  s.setDragTextureIndex(null)
}
</script>

<template>
  <div
    class="dock-stack"
    :class="isVisible ? 'is-visible' : ''"
  >
    <!-- Top row: edit-only tools, slides in/out as edits start/end. -->
    <Transition name="edit-dock">
      <div
        v-if="isEditing && !isDraggingTexture"
        class="dock"
      >
        <button
          class="icon-btn"
          :class="{ 'is-active': isSnapEnabled }"
          title="Snap rotation (15°)"
          @click="toggleSnap"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 15a6 6 0 0 0 12 0V3h-4v12a2 2 0 0 1-4 0V3H6Z" />
            <line x1="6" y1="8" x2="10" y2="8" />
            <line x1="14" y1="8" x2="18" y2="8" />
          </svg>
        </button>

        <button
          class="icon-btn"
          :class="{ 'is-active': editingFlipX }"
          title="Flip horizontal"
          @click="toggleFlipX"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v18" />
            <path d="M16 7l4 5-4 5" />
            <path d="M8 7L4 12l4 5" />
          </svg>
        </button>
        <button
          class="icon-btn"
          :class="{ 'is-active': editingFlipY }"
          title="Flip vertical"
          @click="toggleFlipY"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12h18" />
            <path d="M7 8l5-4 5 4" />
            <path d="M7 16l5 4 5-4" />
          </svg>
        </button>

        <div ref="tintWrapperRef" class="tint-wrapper">
          <button
            class="icon-btn"
            :class="{ 'is-active': hasCustomTint || isTintOpen }"
            title="Tint & opacity"
            @click="toggleTint"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 4v14a3 3 0 1 0 6 0V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1Z" />
              <path d="M9 9h6" />
            </svg>
            <span
              v-if="editingColor"
              class="tint-swatch"
              :style="{ backgroundColor: editingColor }"
            ></span>
          </button>

          <div v-if="isTintOpen" class="tint-popover" role="dialog" aria-label="Tint & opacity">
            <div class="tint-row">
              <span class="tint-row__label">Color</span>
              <input
                class="tint-color-input"
                type="color"
                :value="colorInputValue"
                @input="onColorChange"
              />
              <span class="tint-value">{{ colorInputValue }}</span>
            </div>
            <div class="tint-row">
              <span class="tint-row__label">Opacity</span>
              <input
                class="tint-range"
                type="range"
                min="0"
                max="1"
                step="0.05"
                :value="opacityInputValue"
                @input="onOpacityChange"
              />
              <span class="tint-value">{{ opacityDisplay }}</span>
            </div>
            <button class="tint-reset" type="button" @click="resetTint">Reset</button>
          </div>
        </div>

        <span class="divider"></span>

        <div class="layer-control" :title="`Layer ${editingZIndex ?? 0}`">
          <button class="layer-btn" title="Send back" @click="changeZIndex(-1)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <span class="layer-val tabular-nums">L{{ editingZIndex ?? 0 }}</span>
          <button class="layer-btn" title="Bring forward" @click="changeZIndex(1)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <template v-if="isUpdating">
          <span class="divider"></span>
          <button class="icon-btn is-danger" title="Delete (Del)" @click="remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </template>

        <span class="divider"></span>

        <button class="icon-btn is-danger" title="Cancel (Esc)" @click="cancel">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button class="primary-btn" title="Confirm (Enter)" @click="commit">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Confirm</span>
          <kbd class="kbd">⏎</kbd>
        </button>
      </div>
    </Transition>

    <!-- Bottom row: persistent palette (visible whenever textures exist). -->
    <div class="dock dock--persistent">
      <div
        v-if="isEditing || isDraggingTexture"
        class="mode-badge"
        :class="isUpdating ? 'is-update' : 'is-place'"
      >
        <span class="mode-badge__dot">
          <span class="mode-badge__ping"></span>
          <span class="mode-badge__core"></span>
        </span>
        {{ isUpdating ? 'Editing' : isEditing ? 'Placing' : 'Drop to place' }}
      </div>
      <div v-else class="mode-badge mode-badge--idle">
        <span class="mode-badge__core"></span>
        Pick a logo
      </div>

      <div
        v-if="textures.length"
        class="picker"
      >
        <button
          v-for="(tex, i) in textures"
          :key="tex.uuid || i"
          :title="`${getTextureLabel(tex)} — drag onto the model or click then click the model`"
          :draggable="true"
          class="thumb"
          :class="[
            i === textureIndex ? 'is-active' : '',
            i === dragTextureIndex ? 'is-dragging' : '',
          ]"
          @click="selectTexture(i)"
          @dragstart="(e) => onThumbDragStart(e, i)"
          @dragend="onThumbDragEnd"
        >
          <span class="thumb__frame">
            <img
              v-if="getTextureSrc(tex)"
              :src="getTextureSrc(tex)"
              :alt="getTextureLabel(tex)"
              class="thumb__img"
              draggable="false"
            />
          </span>
          <span v-if="i === textureIndex" class="thumb__check" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </button>
      </div>

      <div class="export-slot">
        <button
          class="icon-btn"
          :disabled="!canUndo"
          title="Undo (⌘Z)"
          @click="undo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
          </svg>
        </button>
        <button
          class="icon-btn"
          :disabled="!canRedo"
          title="Redo (⇧⌘Z)"
          @click="redo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 7v6h-6" />
            <path d="M3 17a9 9 0 0 1 15-6.7L21 13" />
          </svg>
        </button>
        <span class="divider"></span>
        <button
          class="icon-btn"
          title="Import layout from JSON"
          @click="openImportDialog"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </button>
        <button
          class="icon-btn"
          :disabled="!hasData"
          title="Export layout as JSON"
          @click="exportLayout"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        <input
          ref="fileInputRef"
          type="file"
          accept="application/json,.json"
          hidden
          @change="onImportFile"
        />
      </div>
    </div>
  </div>
</template>
