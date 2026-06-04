<script setup lang="ts">
/**
 * Reference HTML overlay for `<Decal>` editing — splits into three panels:
 * - {@link ./Handle.vue}: floating move/rotate/scale circle anchored on the decal
 * - {@link ./Dock.vue}: bottom dock (mode badge + texture picker + import/export + edit tools)
 * - {@link ./LayerList.vue}: right-side layer list with drag-to-reorder
 *
 * State is shared via provide/inject ({@link ./context.ts}). Global keyboard
 * shortcuts (Enter / Esc / Delete) and click-outside dismiss live here.
 */
import { computed, provide, ref, useTemplateRef, watchEffect } from 'vue'
import { onKeyStroke, useEventListener } from '@vueuse/core'
import type { Texture } from 'three'
import type { DecalEditorSession } from '../useDecalEditor'
import { ensureTextureNames } from '../DecalGeometry'

import Handle from './Handle.vue'
import Dock from './Dock.vue'
import LayerList from './LayerList.vue'
import type { DecalLayout } from './context'
import { DECAL_DEBUG_KEY, downloadDecalLayout } from './context'
import './styles.css'

const props = withDefaults(defineProps<{
  session?: DecalEditorSession | null
  /** Mesh-name-keyed map matching each `<Decal>`'s `v-model:data`. */
  data?: DecalLayout
  textures?: Texture[]
  theme?: 'light' | 'dark'
  /**
   * Rotation step (in degrees) applied to the radial slider when the
   * snap toggle is on. Default `15` — every 15° matches the snap ticks
   * drawn around the handle.
   */
  snapAngle?: number
  /**
   * Filename used by the built-in Export download. When omitted, defaults
   * to `decal-layout-YYYY-MM-DD.json`. Pass `null` to skip the automatic
   * download — the `@export` event still fires so hosts can persist the
   * JSON elsewhere (POST, localStorage, etc.). Boolean values are
   * intentionally not accepted: Vue would coerce a missing prop to
   * `false` and break the default download.
   */
  exportFilename?: string | null
  /**
   * Scope the overlay to the nearest positioned ancestor instead of
   * pinning it to the viewport. Useful for embedding the editor inside
   * a documentation page or a bounded "stage" in a host app.
   */
  contained?: boolean
}>(), {
  theme: 'light',
  snapAngle: 15,
  contained: false,
})
const emit = defineEmits<{
  (e: 'export', layout: DecalLayout): void
  /**
   * Emitted when the user picks a JSON file via the Import button. The
   * layout has already been validated, sanitised (unknown mesh keys
   * dropped, entries with unknown texture names dropped) and is safe to
   * apply directly onto the reactive `data` ref the host binds.
   */
  (e: 'import', layout: DecalLayout): void
}>()

const rootRef = useTemplateRef<HTMLDivElement>('rootRef')

const session = computed(() => props.session ?? null)
const layout = computed<DecalLayout>(() => props.data ?? {})
const textures = computed<Texture[]>(() => props.textures ?? [])
const isSnapEnabled = ref(false)

// Sync-flush so the first panel render sees the names. DecalDebugUI
// usually mounts before any <Decal> (it's outside the canvas), so we
// can't rely on Decal's matching watchEffect alone.
watchEffect(() => ensureTextureNames(textures.value), { flush: 'sync' })

const hasData = computed(() => {
  for (const entries of Object.values(layout.value)) {
    if (entries.length) { return true }
  }
  return false
})

const isEditing = computed(() => !!session.value?.editingEntry.value)
const isUpdating = computed(() => session.value?.editingMode.value === 'update')

function commit() { session.value?.commit() }
function cancel() { session.value?.cancel() }
function remove() { session.value?.remove() }

function defaultExportFilename(): string {
  return `decal-layout-${new Date().toISOString().slice(0, 10)}.json`
}

function exportLayout() {
  // Commit propagates sync via update:data → layout.value is fresh below.
  if (isEditing.value) { session.value?.commit() }
  const json = layout.value
  if (props.exportFilename !== null) {
    downloadDecalLayout(json, props.exportFilename ?? defaultExportFilename())
  }
  emit('export', json)
}

/**
 * Validate a parsed JSON layout and drop anything the host can't
 * faithfully render: meshes the host hasn't bound a `<Decal>` to, and
 * entries whose `map` doesn't match any texture in the current palette.
 * Each drop emits a console warning so the user can correlate.
 */
function sanitiseImported(parsed: unknown): DecalLayout | null {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    console.warn('[cientos] DecalDebugUI: imported JSON is not a mesh-name-keyed object.')
    return null
  }
  const knownMeshes = new Set(Object.keys(layout.value))
  const knownTextures = new Set(textures.value.map(t => t.name).filter(Boolean))
  const out: DecalLayout = {}
  for (const [meshName, raw] of Object.entries(parsed as Record<string, unknown>)) {
    if (!knownMeshes.has(meshName)) {
      console.warn(`[cientos] DecalDebugUI: ignoring mesh "${meshName}" — no <Decal> is bound to it.`)
      continue
    }
    if (!Array.isArray(raw)) {
      console.warn(`[cientos] DecalDebugUI: ignoring mesh "${meshName}" — expected an array of entries.`)
      continue
    }
    out[meshName] = []
    for (const entry of raw as Array<Record<string, unknown> | null | undefined>) {
      if (!entry || typeof entry !== 'object') { continue }
      const map = entry.map
      if (typeof map === 'string' && map && knownTextures.size && !knownTextures.has(map)) {
        console.warn(`[cientos] DecalDebugUI: dropping entry "${entry.id ?? '?'}" — texture "${map}" is not in the current palette.`)
        continue
      }
      out[meshName].push(entry as DecalLayout[string][number])
    }
  }
  return out
}

async function importLayoutFromFile(file: File) {
  let text: string
  try { text = await file.text() }
  catch (err) {
    console.warn('[cientos] DecalDebugUI: import failed — could not read file.', err)
    return
  }
  let parsed: unknown
  try { parsed = JSON.parse(text) }
  catch (err) {
    console.warn('[cientos] DecalDebugUI: import failed — invalid JSON.', err)
    return
  }
  const sanitised = sanitiseImported(parsed)
  if (!sanitised) { return }
  // Route entries back to each <Decal> by mesh name via the session.
  session.value?.applyImportedLayout(sanitised)
  emit('import', sanitised)
}

provide(DECAL_DEBUG_KEY, {
  session,
  theme: computed(() => props.theme),
  layout,
  hasData,
  textures,
  isSnapEnabled,
  snapAngleDeg: computed(() => props.snapAngle),
  rootRef,
  commit,
  cancel,
  remove,
  exportLayout,
  importLayoutFromFile,
})

// Click outside the overlay = commit (update) or cancel (create).
useEventListener(window, 'pointerdown', (event) => {
  if (!isEditing.value) { return }
  const target = event.target as Node | null
  if (!target || !rootRef.value) { return }
  if (rootRef.value.contains(target)) { return }
  if (isUpdating.value) { commit() }
  else { cancel() }
})

onKeyStroke('Enter', (e) => {
  if (!isEditing.value) { return }
  e.preventDefault()
  commit()
})

onKeyStroke('Escape', (e) => {
  if (!isEditing.value) { return }
  e.preventDefault()
  cancel()
})

onKeyStroke(['Delete', 'Backspace'], (e) => {
  if (!isEditing.value) { return }
  e.preventDefault()
  if (isUpdating.value) { remove() }
  else { cancel() }
})

// Cmd/Ctrl+Z undo, Shift+Cmd/Ctrl+Z redo. Skipped mid-edit — would
// race the live editingEntry mutations.
useEventListener(window, 'keydown', (event) => {
  const mod = event.metaKey || event.ctrlKey
  if (!mod || event.key.toLowerCase() !== 'z') { return }
  if (isEditing.value) { return }
  event.preventDefault()
  const s = session.value
  if (!s) { return }
  if (event.shiftKey) { s.redo() }
  else { s.undo() }
})
</script>

<template>
  <div
    ref="rootRef"
    class="cientos-decal-ui"
    :class="[`theme-${theme}`, contained ? 'is-contained' : '']"
  >
    <Handle />
    <Dock />
    <LayerList />
  </div>
</template>
