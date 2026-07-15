<script setup lang="ts">
/**
 * Side panel listing every placed decal, **grouped by mesh** (Photoshop-
 * style layers panel). Each group has a header (mesh name + count) and
 * its own zIndex-ordered rows. Drag-to-reorder operates within a group
 * — cross-mesh moves are out of scope (they would require re-assigning
 * the entry to a different `<Decal>`'s data slice).
 */
import { computed, inject, ref } from 'vue'
import type { DecalJsonEntry } from '../Decal.vue'
import { DECAL_DEBUG_KEY, getTextureSrc } from './context'

const ctx = inject(DECAL_DEBUG_KEY)
if (!ctx) { throw new Error('[DecalDebugUI] LayerList.vue requires the DecalDebugUI context.') }
const { session, layout, textures } = ctx

const editingId = computed(() => session.value?.editingEntry.value?.id ?? null)

interface MeshGroup {
  meshName: string
  entries: DecalJsonEntry[]
}

// Overlay in-flight editing state — props.data only updates on commit.
const liveLayout = computed<Record<string, DecalJsonEntry[]>>(() => {
  const editing = session.value?.editingEntry.value
  if (!editing) { return layout.value }
  const out: Record<string, DecalJsonEntry[]> = {}
  for (const [meshName, entries] of Object.entries(layout.value)) {
    out[meshName] = entries.map((e) => {
      if (e.id !== editing.id) { return e }
      return {
        ...e,
        zIndex: editing.zIndex,
        flipX: editing.flipX || undefined,
        flipY: editing.flipY || undefined,
        map: editing.map?.name ?? e.map,
        visible: editing.visible === false ? false : undefined,
      }
    })
  }
  return out
})

const groups = computed<MeshGroup[]>(() => {
  const result: MeshGroup[] = []
  for (const [meshName, entries] of Object.entries(liveLayout.value)) {
    if (!entries.length) { continue }
    result.push({
      meshName,
      entries: entries.slice().sort((a, b) => b.zIndex - a.zIndex),
    })
  }
  return result
})

const totalCount = computed(() => groups.value.reduce((n, g) => n + g.entries.length, 0))

const draggedId = ref<string | null>(null)
const draggedMesh = ref<string | null>(null)
const dragOverId = ref<string | null>(null)
const dragOverPosition = ref<'before' | 'after' | null>(null)

const thumbSrcByName = computed(() => {
  const map = new Map<string, string>()
  for (const tex of textures.value) {
    const src = getTextureSrc(tex)
    if (tex.name && src) { map.set(tex.name, src) }
  }
  return map
})

function editById(id: string) {
  session.value?.beginEditById(id)
}

// Mirror pointer-hover on a list row to the 3D edges helper, so the user
// can scrub the list and see which decal is which. Composes with 3D
// pointer hover through the session's `enteredEntries` set.
function hoverById(id: string, on: boolean) {
  session.value?.setHoveredById(id, on)
}

function toggleVisibility(event: Event, entry: DecalJsonEntry) {
  event.stopPropagation()
  if (!session.value) { return }
  const isVisible = entry.visible !== false
  session.value.setVisibilityById(entry.id, !isVisible)
}

function removeEntry(event: Event, entry: DecalJsonEntry) {
  event.stopPropagation()
  session.value?.removeById(entry.id)
}

function onDragStart(event: DragEvent, entry: DecalJsonEntry, meshName: string) {
  draggedId.value = entry.id
  draggedMesh.value = meshName
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('application/x-decal-id', entry.id)
  }
}

function onDragOver(event: DragEvent, entry: DecalJsonEntry, meshName: string) {
  if (!draggedId.value || draggedId.value === entry.id) { return }
  // Lock drag-reorder within the original mesh group.
  if (draggedMesh.value !== meshName) { return }
  event.preventDefault()
  if (event.dataTransfer) { event.dataTransfer.dropEffect = 'move' }
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  dragOverId.value = entry.id
  dragOverPosition.value = event.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
}

function onDragLeave(entry: DecalJsonEntry) {
  if (dragOverId.value === entry.id) {
    dragOverId.value = null
    dragOverPosition.value = null
  }
}

function onDrop(event: DragEvent, target: DecalJsonEntry, meshName: string) {
  const id = draggedId.value
  const pos = dragOverPosition.value
  const sourceMesh = draggedMesh.value
  reset()
  if (!id || !pos || id === target.id || !session.value || sourceMesh !== meshName) { return }
  event.preventDefault()

  const group = groups.value.find(g => g.meshName === meshName)
  if (!group) { return }

  const sorted = group.entries.slice()
  const fromIdx = sorted.findIndex(d => d.id === id)
  const toIdx = sorted.findIndex(d => d.id === target.id)
  if (fromIdx === -1 || toIdx === -1) { return }

  const [moved] = sorted.splice(fromIdx, 1)
  let insertIdx = toIdx
  if (fromIdx < toIdx) { insertIdx -= 1 }
  if (pos === 'after') { insertIdx += 1 }
  sorted.splice(insertIdx, 0, moved)

  // Reassign every zIndex in one shot: N back-to-back setZIndexById
  // calls would each read stale props.data and emit conflicting updates —
  // only the last would win, leaving duplicate zIndices on the others.
  const n = sorted.length
  const reordered = sorted.map((entry, i) => ({ ...entry, zIndex: n - 1 - i }))
  session.value.setMeshData(meshName, reordered, { recordHistory: true })
}

function onDragEnd() { reset() }

function reset() {
  draggedId.value = null
  draggedMesh.value = null
  dragOverId.value = null
  dragOverPosition.value = null
}
</script>

<template>
  <div class="dock decal-list">
    <header class="list-header">
      <span class="list-header__title">Layers</span>
      <span class="list-header__count">{{ totalCount }}</span>
    </header>

    <div v-if="totalCount === 0" class="list-empty">
      No decals yet
    </div>

    <section
      v-for="group in groups"
      :key="group.meshName"
      class="list-group"
    >
      <header class="list-group__header">
        <span class="list-group__name">{{ group.meshName }}</span>
        <span class="list-group__count">{{ group.entries.length }}</span>
      </header>

      <div class="list-group__items">
        <div
          v-for="entry in group.entries"
          :key="entry.id"
          :title="`${group.meshName} · Layer ${entry.zIndex} — drag to reorder`"
          class="list-item"
          :class="[
            { 'is-editing': editingId === entry.id },
            { 'is-dragging': draggedId === entry.id },
            { 'is-hidden': entry.visible === false },
            dragOverId === entry.id && dragOverPosition === 'before' ? 'drop-before' : '',
            dragOverId === entry.id && dragOverPosition === 'after' ? 'drop-after' : '',
          ]"
          :draggable="true"
          @click="editById(entry.id)"
          @mouseenter="hoverById(entry.id, true)"
          @mouseleave="hoverById(entry.id, false)"
          @dragstart="(e) => onDragStart(e, entry, group.meshName)"
          @dragover="(e) => onDragOver(e, entry, group.meshName)"
          @dragleave="onDragLeave(entry)"
          @drop="(e) => onDrop(e, entry, group.meshName)"
          @dragend="onDragEnd"
        >
          <button
            type="button"
            class="list-item__eye"
            :class="{ 'is-off': entry.visible === false }"
            :title="entry.visible === false ? 'Show decal' : 'Hide decal'"
            :aria-label="entry.visible === false ? 'Show decal' : 'Hide decal'"
            :aria-pressed="entry.visible !== false"
            draggable="false"
            @click="toggleVisibility($event, entry)"
            @dragstart.stop.prevent
          >
            <svg v-if="entry.visible !== false" viewBox="0 0 16 16" aria-hidden="true">
              <path fill="currentColor" d="M8 3.5c-3.2 0-5.8 2.3-7 4.5 1.2 2.2 3.8 4.5 7 4.5s5.8-2.3 7-4.5c-1.2-2.2-3.8-4.5-7-4.5Zm0 7.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
              <circle cx="8" cy="8" r="1.4" fill="#0b1320" />
            </svg>
            <svg v-else viewBox="0 0 16 16" aria-hidden="true">
              <path fill="currentColor" d="M2.7 2 1.6 3.1l2.1 2.1A11 11 0 0 0 1 8c1.2 2.2 3.8 4.5 7 4.5 1.1 0 2.1-.3 3-.7l2 2 1-1L2.7 2Zm5.3 3.5c.6 0 1.2.1 1.7.4l-.9.9a1.4 1.4 0 0 0-1.7 1.7l-.9.9A2.8 2.8 0 0 1 8 5.5Zm0 5.6c-.4 0-.8-.1-1.2-.2L9 9.2c0 .7-.5 1.3-1 1.5l0 .4Zm5.4-1.6A6.5 6.5 0 0 0 15 8a7.2 7.2 0 0 0-5.9-4.4l-.8.8A6.4 6.4 0 0 1 14 8c-.4.7-1 1.3-1.6 1.8l1 .7Z" />
            </svg>
          </button>
          <span class="list-item__thumb">
            <img
              v-if="entry.map && thumbSrcByName.get(entry.map)"
              :src="thumbSrcByName.get(entry.map)"
              :alt="entry.map"
              class="list-item__img"
              draggable="false"
            />
          </span>
          <span class="list-item__layer">L{{ entry.zIndex }}</span>
          <button
            type="button"
            class="list-item__remove"
            title="Remove decal"
            aria-label="Remove decal"
            draggable="false"
            @click="removeEntry($event, entry)"
            @dragstart.stop.prevent
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" d="M4 4l8 8M12 4L4 12" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
