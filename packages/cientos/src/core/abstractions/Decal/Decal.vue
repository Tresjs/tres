<script setup lang="ts">
/**
 * Public `<Decal>` component.
 *
 * - `v-model:data` serialises stamped decals as a plain JSON array.
 * - Pass a `Texture` or `Texture[]` via `map` (multiple = a cyclable palette).
 * - Set `editable` to mount the interactive editor and overlay-driven UI.
 * - `mesh` lets you target a mesh that isn't `<Decal>`'s Vue-template
 *   parent — the decal mesh is imperatively re-parented to the target
 *   in the scene graph, so it follows the target's runtime transforms.
 *   Without `mesh`, the parent is auto-resolved via a hidden anchor.
 *
 * Imperative API (via `ref`): `editor`, `beginEditById`, `commit`,
 * `cancel`, `remove`. The same actions are also available globally on
 * the shared session through `useDecalEditor()`.
 *
 * @example
 * ```vue
 * <TresMesh name="helmet">
 *   <TresBoxGeometry />
 *   <TresMeshStandardMaterial />
 *   <Decal v-model:data="decals" :map="logoTexture" editable />
 * </TresMesh>
 * ```
 *
 * **Limitations** — `DecalGeometry` (three-stdlib) bakes vertices at build
 * time, so the projection is **static** relative to the parent's bind
 * pose. Animated transforms (position / rotation / scale) on the parent
 * are followed via the scene graph, but:
 * - `SkinnedMesh` skinning is not applied to the decal (the decal stays
 *   in rest pose). See three.js#7926.
 * - `morphAttributes` on the parent are ignored.
 * - Decals near silhouettes can wrap around (three.js#21187) — partially
 *   mitigated by {@link DecalProps.cullThreshold cullThreshold}.
 * A shader-based projection (no geometry baking) is the canonical fix —
 * out of scope here.
 */
import { computed, isRef, onBeforeUnmount, shallowRef, watch, watchEffect } from 'vue'
import type { Group, Mesh, Texture } from 'three'
import { Euler, Object3D, Raycaster, Vector2, Vector3 } from 'three'
import type { ShallowRef } from 'vue'
import { useTres } from '@tresjs/core'

import DecalItem from './DecalItem.vue'
import DecalEditor from './DecalEditor.vue'
import type { DecalEditorSession, DecalEntry, DecalJsonEntry } from './useDecalEditor'
import { provideDecalEditor } from './useDecalEditor'
import { ensureTextureNames, getTextureAspect, getTextureName } from './DecalGeometry'

export type { DecalJsonEntry }

/**
 * The shape returned by a `<Decal>` template ref. Each method is a thin
 * wrapper around the matching `useDecalEditor()` session call, scoped to
 * the entries owned by this `<Decal>`.
 *
 * Bind a template ref typed as `DecalImperativeApi` to drive the editor
 * from the host without going through `useDecalEditor()` directly.
 */
export interface DecalImperativeApi {
  /** The shared session — also retrievable via `useDecalEditor()`. */
  editor: DecalEditorSession
  /** Programmatically start editing a placed decal by id. */
  beginEditById: (id: string) => boolean
  /** Commit the in-flight edit (Create/Update). */
  commit: () => void
  /** Cancel the in-flight edit; updates restore from backup, creates are dropped. */
  cancel: () => void
  /** Delete the in-flight decal (no-op when nothing is being edited). */
  remove: () => void
}

type MeshLike = Mesh | ShallowRef<Mesh | null | undefined> | null | undefined

const props = withDefaults(defineProps<{
  /** Bidirectional list of stamped decals (use with `v-model:data`). */
  data?: DecalJsonEntry[]
  /** A single texture or a list of textures the user can cycle through. */
  map?: Texture | Texture[] | null
  /**
   * Optional explicit target mesh — otherwise the scene-graph parent
   * of `<Decal>` is auto-resolved via a hidden anchor `<TresGroup>`.
   * The decal mesh is imperatively re-parented to the target on build,
   * so it follows the target's runtime transforms via the scene graph
   * regardless of where `<Decal>` sits in the Vue template.
   */
  mesh?: MeshLike
  /** Enable interactive editing (mounts the editor + pointer handlers). */
  editable?: boolean
  /** Reference size used to derive the decal size from the texture aspect ratio. */
  baseSize?: number
  /**
   * Base offset along the surface normal (in parent units) to avoid
   * z-fighting between the decal and its host. Default `0.01`.
   */
  baseOffset?: number
  /**
   * Extra offset added per `zIndex` step on top of {@link baseOffset}.
   * Default `0.001`. Increase if multiple stacked decals still z-fight.
   */
  layerGap?: number
  /**
   * Cull triangles whose face normal makes an angle steeper than
   * `acos(threshold)` with the projector direction. Mitigates the
   * three-stdlib `DecalGeometry` wrap-around bug (three.js#21187).
   * Default `0.2` (≈78°). Pass `0` or negative to disable culling.
   */
  cullThreshold?: number
}>(), {
  data: () => [],
  map: null,
  mesh: null,
  editable: false,
  baseSize: 1,
  baseOffset: 0.01,
  layerGap: 0.001,
  cullThreshold: 0.2,
})

const emit = defineEmits<{
  /** v-model:data partner — fired whenever the JSON list is mutated. */
  (e: 'update:data', value: DecalJsonEntry[]): void
  /** A new decal has been committed (`create` mode → confirm). */
  (e: 'add', entry: DecalEntry): void
  /** An existing decal has been committed (`update` mode → confirm). */
  (e: 'update', entry: DecalEntry): void
  /** A decal has been removed (delete button or `Del`/`Backspace`). */
  (e: 'delete', entry: DecalEntry): void
  /** Edition began on `entry` (panel click, 3D click, or programmatic). */
  (e: 'select', entry: DecalEntry): void
  /** Edition was aborted without commit (Esc, click-outside in create mode). */
  (e: 'cancel'): void
  /**
   * Fired on click of any stamped decal — even when `editable` is false.
   * Useful for read-only host UIs that want to react to user clicks
   * without enabling the editor.
   */
  (e: 'decalClick', payload: { entry: DecalEntry, event: MouseEvent }): void
}>()

const session = provideDecalEditor()
const anchorRef = shallowRef<Group | null>(null)
const { camera, renderer } = useTres()

const textures = computed<Texture[]>(() => {
  if (!props.map) { return [] }
  const list = Array.isArray(props.map) ? props.map : [props.map]
  return list.filter((t): t is Texture => t != null)
})

// Sync-flush so sibling consumers (overlays, layer panels) see the
// `.name` on their first render — Three.js property mutations are not
// reactive, so a lazy pass would race.
watchEffect(() => ensureTextureNames(textures.value), { flush: 'sync' })

function resolveTexture(name: string | null): Texture | null {
  const list = textures.value
  if (!name || list.length === 0) { return null }
  const found = list.find(t => t.name === name)
  if (!found) {
    console.warn(`[cientos] <Decal>: texture "${name}" not found in \`map\`; falling back to the first available.`)
  }
  return found ?? list[0] ?? null
}

const resolvedMesh = computed<Mesh | null>(() => {
  const m = props.mesh
  if (!m) { return null }
  return isRef(m) ? (m.value ?? null) : m
})

const parent = computed<Mesh | null>(() => {
  const explicit = resolvedMesh.value
  if (explicit) { return explicit }
  const anchorParent = anchorRef.value?.parent
  return (anchorParent && (anchorParent as Mesh).isMesh) ? (anchorParent as Mesh) : null
})

watch(() => props.editable, (editable) => {
  if (editable) {
    console.warn('[cientos] <Decal>: `editable` is enabled — the interactive editor is for authoring decal layouts, NOT for production. Remove the `editable` prop (and unmount `<DecalDebugUI>`) before shipping; persist the resulting `v-model:data` JSON instead.')
  }
}, { immediate: true })

// Projected geometry is baked at build time — warn about parents whose
// runtime state (skinning, morph, non-uniform scale) would diverge.
const warnedParents = new WeakSet<Mesh>()
watch(parent, (m) => {
  if (!m || warnedParents.has(m)) { return }
  warnedParents.add(m)
  if ((m as { isSkinnedMesh?: boolean }).isSkinnedMesh) {
    console.warn('[cientos] <Decal>: parent is a SkinnedMesh — projected geometry is baked at build time and will NOT deform with the skeleton.')
  }
  const morphs = m.geometry?.morphAttributes
  if (morphs && Object.keys(morphs).length > 0) {
    console.warn('[cientos] <Decal>: parent has morph targets — projected geometry is baked at build time and will NOT follow morphing.')
  }
  const s = m.scale
  if (s && (Math.abs(s.x - s.y) > 1e-4 || Math.abs(s.x - s.z) > 1e-4)) {
    console.warn(`[cientos] <Decal>: parent has non-uniform scale (${s.x.toFixed(3)}, ${s.y.toFixed(3)}, ${s.z.toFixed(3)}). Polygon-offset uses scale.x as a single divisor — z-layering may drift on the other axes. Consider uniform scaling.`)
  }
}, { immediate: true })

const stampedEntries = shallowRef<DecalEntry[]>([])

function rebuildEntries() {
  stampedEntries.value = props.data.map((entry): DecalEntry => ({
    id: entry.id,
    position: new Vector3(...entry.position),
    orientation: new Euler(...entry.orientation),
    size: new Vector3(...entry.size),
    zIndex: entry.zIndex,
    map: resolveTexture(entry.map),
    flipX: !!entry.flipX,
    flipY: !!entry.flipY,
    color: typeof entry.color === 'string' ? entry.color : null,
    opacity: typeof entry.opacity === 'number' ? entry.opacity : null,
    visible: entry.visible !== false,
  }))
}

watch([() => props.data, textures], rebuildEntries, { immediate: true })

// The in-flight `create` preview only belongs to the locked Decal —
// otherwise siblings would each render an empty ghost of the same entry.
const renderedEntries = computed<DecalEntry[]>(() => {
  const editing = session.editingEntry.value
  const m = parent.value
  if (
    session.editingMode.value === 'create'
    && editing
    && m
    && session.lockedMeshUuid.value === m.uuid
  ) {
    return [...stampedEntries.value, editing]
  }
  return stampedEntries.value
})

watch(textures, list => session.setTextureCount(list.length), { immediate: true })

watch([stampedEntries, parent], ([list, m]) => {
  if (!m) { return }
  const max = list.reduce((acc, e) => Math.max(acc, e.zIndex), -1)
  session.setNextZIndex(m.uuid, max + 1)
}, { immediate: true })

function serialize(entry: DecalEntry): DecalJsonEntry {
  const json: DecalJsonEntry = {
    id: entry.id,
    position: [entry.position.x, entry.position.y, entry.position.z],
    orientation: [entry.orientation.x, entry.orientation.y, entry.orientation.z],
    size: [entry.size.x, entry.size.y, entry.size.z],
    zIndex: entry.zIndex,
    map: getTextureName(entry.map),
  }
  if (entry.flipX) { json.flipX = true }
  if (entry.flipY) { json.flipY = true }
  if (entry.color) { json.color = entry.color }
  if (entry.opacity !== null && entry.opacity !== undefined) { json.opacity = entry.opacity }
  if (entry.visible === false) { json.visible = false }
  return json
}

// Session events broadcast to every <Decal> — guard so each only
// reacts to events targeting its own mesh.
function isForThisDecal(): boolean {
  const m = parent.value
  return !!m && session.lockedMeshUuid.value === m.uuid
}

function recordHistoryFor(before: DecalJsonEntry[], after: DecalJsonEntry[]) {
  const m = parent.value
  if (m) { session.recordHistory(m.uuid, before, after) }
}

const offCommit = session.onCommit((entry, mode) => {
  if (!isForThisDecal()) { return }
  const json = serialize(entry)
  const before = props.data
  const after = mode === 'create'
    ? [...before, json]
    : before.map(d => d.id === entry.id ? json : d)
  if (mode === 'create') { emit('add', entry) }
  else { emit('update', entry) }
  emit('update:data', after)
  recordHistoryFor(before, after)
})

const offDelete = session.onDelete((entry) => {
  if (!isForThisDecal()) { return }
  const before = props.data
  const after = before.filter(d => d.id !== entry.id)
  emit('delete', entry)
  emit('update:data', after)
  recordHistoryFor(before, after)
})

const offCancel = session.onCancel(() => {
  if (!isForThisDecal()) { return }
  emit('cancel')
})

const tmpProj = new Vector3()
const tmpRay = new Raycaster()
const tmpCursor = new Vector2()
const tmpNormal = new Vector3()
const tmpDummy = new Object3D()

function projectWorldToScreen(world: Vector3) {
  const cam = camera.value
  const canvas = renderer?.domElement
  if (!cam || !canvas) { return }
  tmpProj.copy(world).project(cam)
  // Window-coords (clientRect-relative) so the Handle's `position: fixed`
  // anchor matches the same frame DecalEditor uses for create-mode preview.
  const rect = canvas.getBoundingClientRect()
  const sx = rect.left + (tmpProj.x * 0.5 + 0.5) * rect.width
  const sy = rect.top + (-(tmpProj.y * 0.5 - 0.5)) * rect.height
  session.setScreenAnchor(sx, sy)
}

function computeBaseDecalWidth(map: Texture | null): number {
  return getTextureAspect(map).x * props.baseSize
}

// Seed session.scale / .angle from the entry on beginEdit — without
// this the editor would snap the decal back to defaults on first frame.
function seedSessionFromEntry(entry: DecalEntry, m: Mesh) {
  const baseDecalW = computeBaseDecalWidth(entry.map)
  if (baseDecalW > 0) { session.setScale(entry.size.x / baseDecalW) }

  const cam = camera.value
  if (!cam) { return }
  tmpCursor.set(session.cursorNdc.x, session.cursorNdc.y)
  tmpRay.setFromCamera(tmpCursor, cam)
  const hit = tmpRay.intersectObject(m, false)[0]
  if (!hit?.face) { return }
  tmpNormal.copy(hit.face.normal).transformDirection(m.matrixWorld).normalize()
  tmpDummy.position.copy(hit.point)
  tmpDummy.lookAt(tmpNormal.add(hit.point))
  session.baseOrientation.copy(tmpDummy.rotation)
  session.setAngle(entry.orientation.z - tmpDummy.rotation.z)
}

function beginEditForEntry(entry: DecalEntry) {
  const m = parent.value
  if (!m) {
    console.warn('[cientos] <Decal>: cannot start edit — parent mesh is not resolved yet.')
    return false
  }
  // beginEdit first — a pending edit on another entry would commit and
  // `resetState()` (scale → 1, angle → 0), clobbering anything seeded
  // before. Seed after the lock is in place.
  session.beginEdit(m.uuid, entry)
  seedSessionFromEntry(entry, m)
  projectWorldToScreen(entry.position)
  emit('select', entry)
  return true
}

function onItemClick(payload: { entry: DecalEntry, event: MouseEvent }) {
  emit('decalClick', payload)
  if (!props.editable) { return }
  beginEditForEntry(payload.entry)
}

function setZIndexForId(id: string, newZ: number) {
  const i = props.data.findIndex(d => d.id === id)
  if (i === -1) { return }
  const clamped = Math.max(0, newZ)
  if (props.data[i].zIndex === clamped) { return }
  const before = props.data
  const next = before.slice()
  next[i] = { ...next[i], zIndex: clamped }
  emit('update:data', next)
  recordHistoryFor(before, next)
}

function setVisibilityForId(id: string, visible: boolean) {
  const i = props.data.findIndex(d => d.id === id)
  if (i === -1) { return }
  const current = props.data[i].visible !== false
  if (current === visible) { return }
  const before = props.data
  const next = before.slice()
  const updated = { ...next[i] }
  if (visible) { delete updated.visible }
  else { updated.visible = false }
  next[i] = updated
  emit('update:data', next)
  recordHistoryFor(before, next)
}

function removeForId(id: string) {
  const i = props.data.findIndex(d => d.id === id)
  if (i === -1) { return }
  const before = props.data
  const after = before.filter(d => d.id !== id)
  const entry = stampedEntries.value.find(e => e.id === id)
  if (entry) { emit('delete', entry) }
  emit('update:data', after)
  recordHistoryFor(before, after)
}

// Setter the session calls back to: undo restores by uuid, import by name,
// batched reorder via setMeshData. History recording is opt-in so undo's
// own `setter(op.before)` doesn't push the inverse onto the stack.
watch([parent, () => parent.value?.name], ([m, name], prev) => {
  const prevMesh = prev?.[0]
  if (prevMesh) { session.unregisterDecalData(prevMesh.uuid) }
  if (m) {
    session.registerDecalData(m.uuid, name ?? null, (next, opts) => {
      const before = props.data
      emit('update:data', next)
      if (opts?.recordHistory) { recordHistoryFor(before, next) }
    })
  }
}, { immediate: true })

const registeredIds = new Set<string>()

watch(stampedEntries, (entries) => {
  const nextIds = new Set(entries.map(e => e.id))
  for (const id of registeredIds) {
    if (!nextIds.has(id)) {
      session.unregisterDecalEntry(id)
      registeredIds.delete(id)
    }
  }
  // Closures look up by id at call time so they survive rebuildEntries
  // (which swaps every DecalEntry object reference on each tick).
  for (const entry of entries) {
    const id = entry.id
    session.registerDecalEntry(id, {
      beginEdit: () => {
        const fresh = stampedEntries.value.find(e => e.id === id)
        if (fresh) { beginEditForEntry(fresh) }
      },
      setZIndex: newZ => setZIndexForId(id, newZ),
      setVisibility: visible => setVisibilityForId(id, visible),
      remove: () => removeForId(id),
    })
    registeredIds.add(id)
  }
}, { immediate: true })

onBeforeUnmount(() => {
  for (const id of registeredIds) {
    session.unregisterDecalEntry(id)
  }
  registeredIds.clear()
  const m = parent.value
  if (m) { session.unregisterDecalData(m.uuid) }
  offCommit()
  offDelete()
  offCancel()
})

defineExpose<DecalImperativeApi>({
  editor: session,
  beginEditById: (id: string) => session.beginEditById(id),
  commit: () => session.commit(),
  cancel: () => session.cancel(),
  remove: () => session.remove(),
})
</script>

<template>
  <TresGroup
    ref="anchorRef"
    :visible="false"
    name="cientos-decal-anchor"
  />

  <template v-if="parent">
    <DecalItem
      v-for="entry in renderedEntries"
      :key="entry.id"
      :parent="parent"
      :entry="entry"
      :editable="editable"
      :base-offset="baseOffset"
      :layer-gap="layerGap"
      :cull-threshold="cullThreshold"
      @click="onItemClick"
    >
      <slot></slot>
    </DecalItem>

    <DecalEditor
      v-if="editable"
      :parent="parent"
      :textures="textures"
      :base-size="baseSize"
    />
  </template>
</template>
