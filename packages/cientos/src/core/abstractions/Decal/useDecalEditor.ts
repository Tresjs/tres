/**
 * Headless editor session for `<Decal>`. One session per `<TresCanvas>`,
 * shared between every Decal in that canvas (WeakMap-by-context, so even
 * sibling Decals can coordinate — `provide/inject` would not).
 *
 * `<Decal>` calls {@link provideDecalEditor} during setup; external UIs
 * (overlays, sidebars, hosts outside the canvas) consume the same session
 * via {@link useDecalEditor} or via the `editor` ref exposed by `<Decal>`.
 */
import type { Intersection, Texture, Vector3 } from 'three'
import { Euler } from 'three'
import type { Ref, ShallowRef } from 'vue'
import { computed, reactive, ref, shallowRef, triggerRef } from 'vue'
import { useTresContext } from '@tresjs/core'

/** In-memory edit-time shape — Three.js objects, mutated during edits. */
export interface DecalEntry {
  id: string
  position: Vector3
  orientation: Euler
  size: Vector3
  zIndex: number
  map: Texture | null
  flipX: boolean
  flipY: boolean
  /** Hex string (e.g. `'#ff6b35'`) or `null` to leave the material colour untouched. */
  color: string | null
  /** 0..1 or `null` to leave the material opacity untouched. */
  opacity: number | null
  /** `false` hides the decal in 3D without removing it from the data. */
  visible: boolean
}

/** Serialisable JSON shape — plain primitives, matches `v-model:data`. */
export interface DecalJsonEntry {
  id: string
  position: [number, number, number]
  orientation: [number, number, number]
  size: [number, number, number]
  zIndex: number
  map: string | null
  flipX?: boolean
  flipY?: boolean
  color?: string
  opacity?: number
  visible?: boolean
}

export type EditMode = 'create' | 'update' | null

interface EntryInit {
  position: Vector3
  orientation: Euler
  size: Vector3
  map?: Texture | null
  zIndex?: number
  id?: string
  flipX?: boolean
  flipY?: boolean
  color?: string | null
  opacity?: number | null
  visible?: boolean
}

type Unsubscribe = () => void
type CommitListener = (entry: DecalEntry, mode: 'create' | 'update') => void
type DeleteListener = (entry: DecalEntry) => void
type CancelListener = () => void

interface DecalDataSetterOpts {
  /** Push a before/after pair onto the undo stack. Default `false`. */
  recordHistory?: boolean
}

/** Setter contract a `<Decal>` registers so undo/redo can push JSON back. */
type DecalDataSetter = (next: DecalJsonEntry[], opts?: DecalDataSetterOpts) => void

/**
 * Per-entry callbacks each `<Decal>` plugs into the session so external code
 * (layer panels, custom HUDs, automation) can act on a decal by id without
 * needing a reference to the owning component.
 */
export interface DecalEntryActions {
  beginEdit: () => void
  setZIndex: (newZ: number) => void
  setVisibility: (visible: boolean) => void
  remove: () => void
  setHovered: (on: boolean) => void
}

interface HistoryEntry {
  /** Mesh uuid identifying which `<Decal>` owns the data. */
  uuid: string
  before: DecalJsonEntry[]
  after: DecalJsonEntry[]
}

/** Maximum number of recorded operations kept on the undo stack. */
const MAX_HISTORY = 100

export interface DecalEditorSession {
  readonly editingEntry: ShallowRef<DecalEntry | null>
  readonly editingMode: Ref<EditMode>
  readonly lockedMeshUuid: Ref<string | null>
  readonly hoveredIntersection: ShallowRef<Intersection | null>
  readonly hoveredMeshUuid: Ref<string | null>
  readonly cursorNdc: Readonly<{ x: number, y: number }>
  readonly scale: Ref<number>
  readonly angle: Ref<number>
  readonly screenAnchor: Readonly<{ x: number, y: number }>
  readonly textureIndex: Ref<number>
  readonly textureCount: Ref<number>
  /** Per-mesh next-zIndex bookkeeping — read with {@link getNextZIndex}. */
  readonly nextZIndexByMesh: Readonly<Record<string, number>>
  readonly isUiDragging: Ref<boolean>
  readonly isCursorOnTarget: Ref<boolean>
  readonly dragTextureIndex: Ref<number | null>
  /** Topmost stamped decal under the cursor, picked by zIndex tie-break. */
  readonly hoveredEntry: ShallowRef<DecalEntry | null>
  /** Surface-aligned orientation at the editing point; final = base + (0, 0, angle). */
  readonly baseOrientation: Euler

  canActOn: (meshUuid: string) => boolean
  isEditing: (meshUuid?: string) => boolean

  beginCreate: (meshUuid: string, init: EntryInit) => void
  beginEdit: (meshUuid: string, entry: DecalEntry) => void
  /**
   * Move an in-flight `create` to another mesh (e.g. dragging a thumbnail
   * across meshes). Reuses the same entry id, preserves texture / zIndex /
   * flip unless explicitly overridden in `init`, and does NOT fire cancel
   * listeners — this is a transfer, not a cancellation.
   */
  transferCreate: (meshUuid: string, init: EntryInit) => void
  commit: () => void
  cancel: () => void
  remove: () => void

  setHovered: (meshUuid: string, intersection: Intersection | null) => void
  clearHovered: (meshUuid: string) => void
  setCursor: (x: number, y: number) => void
  setScreenAnchor: (x: number, y: number) => void
  setScale: (n: number) => void
  setAngle: (rad: number) => void
  setZIndex: (n: number) => void
  changeZIndex: (delta: number) => void
  setTextureIndex: (n: number) => void
  setTextureCount: (n: number) => void
  /** Set the next-zIndex for one mesh. Called by `<Decal>` on every JSON diff. */
  setNextZIndex: (meshUuid: string, n: number) => void
  /** Read the next-zIndex for one mesh (0 when unknown). */
  getNextZIndex: (meshUuid: string) => number
  setUiDragging: (active: boolean) => void
  setCursorOnTarget: (on: boolean) => void
  setDragTextureIndex: (index: number | null) => void
  setHoveredEntry: (entry: DecalEntry) => void
  clearHoveredEntry: (entry: DecalEntry) => void
  setFlipX: (value: boolean) => void
  setFlipY: (value: boolean) => void
  toggleFlipX: () => void
  toggleFlipY: () => void
  setColor: (value: string | null) => void
  setOpacity: (value: number | null) => void
  nextTexture: () => void
  prevTexture: () => void

  /**
   * Register the per-entry action bundle a `<Decal>` exposes — call once
   * per entry; the matching `*ById` session methods route through this.
   */
  registerDecalEntry: (id: string, actions: DecalEntryActions) => void
  unregisterDecalEntry: (id: string) => void

  beginEditById: (id: string) => boolean
  setZIndexById: (id: string, newZ: number) => boolean
  setVisibilityById: (id: string, visible: boolean) => boolean
  /** Remove a decal by id without entering edit mode. Returns `true` if a decal was removed. */
  removeById: (id: string) => boolean
  /**
   * Drive the 3D-side hover state from a non-3D surface (layer panel,
   * thumbnail strip, …). Composes with pointer-driven hover via the same
   * `enteredEntries` set, so external + 3D hover don't fight each other.
   */
  setHoveredById: (id: string, on: boolean) => boolean

  /**
   * Register a JSON-array setter for one Decal's mesh. Required for
   * undo/redo to push restored snapshots back through `update:data`, and
   * for {@link applyImportedLayout} to route imported entries by mesh name.
   */
  registerDecalData: (meshUuid: string, meshName: string | null, setter: DecalDataSetter) => void
  unregisterDecalData: (meshUuid: string) => void
  /**
   * Push a JSON snapshot pair onto the undo stack. The session does NOT
   * apply it — the caller is the one mutating its own data array; we
   * just record the before/after so undo can replay it later.
   */
  recordHistory: (meshUuid: string, before: DecalJsonEntry[], after: DecalJsonEntry[]) => void
  /**
   * Push an imported, sanitised layout back through each `<Decal>`'s
   * registered setter, keyed by mesh name. Slices whose key doesn't match
   * any registered `<Decal>` are skipped silently (the host's sanitise
   * step already warned).
   */
  applyImportedLayout: (layout: Record<string, DecalJsonEntry[]>) => void
  /**
   * Replace one mesh's JSON array in a single emit — avoids the
   * stale-snapshot race that fires when multiple `setZIndexById` /
   * `set…ById` calls run back-to-back in the same tick.
   */
  setMeshData: (meshName: string, entries: DecalJsonEntry[], opts?: DecalDataSetterOpts) => boolean

  readonly canUndo: Ref<boolean>
  readonly canRedo: Ref<boolean>
  undo: () => boolean
  redo: () => boolean

  onCommit: (fn: CommitListener) => Unsubscribe
  onDelete: (fn: DeleteListener) => Unsubscribe
  onCancel: (fn: CancelListener) => Unsubscribe
}

type TresContext = ReturnType<typeof useTresContext>
const sessions = new WeakMap<TresContext, DecalEditorSession>()

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `decal-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function createSession(): DecalEditorSession {
  const editingEntry = shallowRef<DecalEntry | null>(null)
  const editingMode = ref<EditMode>(null)
  const lockedMeshUuid = ref<string | null>(null)
  const hoveredIntersection = shallowRef<Intersection | null>(null)
  const hoveredMeshUuid = ref<string | null>(null)
  const cursorNdc = reactive({ x: 0, y: 0 })
  const scale = ref(1)
  const angle = ref(0)
  const screenAnchor = reactive({ x: 0, y: 0 })
  const textureIndex = ref(0)
  const textureCount = ref(0)
  // Per-mesh stack — zIndex only matters between coplanar decals.
  const nextZIndexByMesh = reactive<Record<string, number>>({})
  const isUiDragging = ref(false)
  const isCursorOnTarget = ref(false)
  const dragTextureIndex = ref<number | null>(null)
  const hoveredEntry = shallowRef<DecalEntry | null>(null)
  const baseOrientation = new Euler()

  // pmndrs's dispatch order is unreliable for coplanar decals — pick
  // the highest-zIndex of every "currently entered" entry as visible hover.
  const enteredEntries = new Set<DecalEntry>()
  // Per-mesh raycast proposals from each <DecalEditor>; resolved to one topmost.
  const proposals = new Map<string, Intersection>()

  let backup: Omit<DecalEntry, 'id'> | null = null

  const entryActionsRegistry = new Map<string, DecalEntryActions>()
  const dataSetterRegistry = new Map<string, DecalDataSetter>()
  const dataSetterByMeshName = new Map<string, DecalDataSetter>()

  const undoStack = shallowRef<HistoryEntry[]>([])
  const redoStack = shallowRef<HistoryEntry[]>([])

  const commitListeners = new Set<CommitListener>()
  const deleteListeners = new Set<DeleteListener>()
  const cancelListeners = new Set<CancelListener>()

  function subscribe<T>(set: Set<T>, fn: T): Unsubscribe {
    set.add(fn)
    return () => { set.delete(fn) }
  }

  function recomputeHovered() {
    let best: DecalEntry | null = null
    for (const e of enteredEntries) {
      if (!best || e.zIndex > best.zIndex) { best = e }
    }
    hoveredEntry.value = best
  }

  function resolveHoverFromProposals() {
    let bestUuid: string | null = null
    let bestDist = Number.POSITIVE_INFINITY
    let bestHit: Intersection | null = null
    for (const [uuid, hit] of proposals) {
      const dist = hit.distance ?? 0
      if (dist < bestDist) {
        bestDist = dist
        bestUuid = uuid
        bestHit = hit
      }
    }
    hoveredMeshUuid.value = bestUuid
    hoveredIntersection.value = bestHit
  }

  function canActOn(uuid: string) {
    return lockedMeshUuid.value === null || lockedMeshUuid.value === uuid
  }

  function isEditing(uuid?: string) {
    if (!editingEntry.value) { return false }
    if (uuid === undefined) { return true }
    return lockedMeshUuid.value === uuid
  }

  function resetState() {
    editingEntry.value = null
    editingMode.value = null
    lockedMeshUuid.value = null
    hoveredIntersection.value = null
    hoveredMeshUuid.value = null
    scale.value = 1
    angle.value = 0
    isUiDragging.value = false
    isCursorOnTarget.value = false
    dragTextureIndex.value = null
    enteredEntries.clear()
    hoveredEntry.value = null
    proposals.clear()
    backup = null
  }

  function snapshotBackup(entry: DecalEntry) {
    backup = {
      position: entry.position.clone(),
      orientation: entry.orientation.clone(),
      size: entry.size.clone(),
      zIndex: entry.zIndex,
      map: entry.map,
      flipX: entry.flipX,
      flipY: entry.flipY,
      color: entry.color,
      opacity: entry.opacity,
      visible: entry.visible,
    }
  }

  function restoreBackup(entry: DecalEntry) {
    if (!backup) { return }
    entry.position.copy(backup.position)
    entry.orientation.copy(backup.orientation)
    entry.size.copy(backup.size)
    entry.zIndex = backup.zIndex
    entry.map = backup.map
    entry.flipX = backup.flipX
    entry.flipY = backup.flipY
    entry.color = backup.color
    entry.opacity = backup.opacity
    entry.visible = backup.visible
  }

  function beginCreate(meshUuid: string, init: EntryInit) {
    if (!canActOn(meshUuid)) { return }
    lockedMeshUuid.value = meshUuid
    editingMode.value = 'create'
    backup = null
    editingEntry.value = {
      id: init.id ?? generateId(),
      position: init.position.clone(),
      orientation: init.orientation.clone(),
      size: init.size.clone(),
      zIndex: init.zIndex ?? 0,
      map: init.map ?? null,
      flipX: init.flipX ?? false,
      flipY: init.flipY ?? false,
      color: init.color ?? null,
      opacity: init.opacity ?? null,
      visible: init.visible ?? true,
    }
  }

  function beginEdit(meshUuid: string, entry: DecalEntry) {
    // No-op if already editing this entry (would lose the Esc backup).
    if (editingEntry.value === entry) { return }
    // Switching focus: commit pending update (keep changes), cancel pending
    // create (placement abandoned).
    if (editingEntry.value) {
      if (editingMode.value === 'update') { commit() }
      else { cancel() }
    }
    if (!canActOn(meshUuid)) { return }
    lockedMeshUuid.value = meshUuid
    editingMode.value = 'update'
    snapshotBackup(entry)
    editingEntry.value = entry
  }

  function transferCreate(targetMeshUuid: string, init: EntryInit) {
    const previous = editingEntry.value
    if (editingMode.value !== 'create' || !previous) { return }
    lockedMeshUuid.value = targetMeshUuid
    editingEntry.value = {
      id: previous.id,
      position: init.position.clone(),
      orientation: init.orientation.clone(),
      size: init.size.clone(),
      zIndex: init.zIndex ?? previous.zIndex,
      map: init.map ?? previous.map,
      flipX: init.flipX ?? previous.flipX,
      flipY: init.flipY ?? previous.flipY,
      color: init.color ?? previous.color,
      opacity: init.opacity ?? previous.opacity,
      visible: init.visible ?? previous.visible,
    }
  }

  function commit() {
    const entry = editingEntry.value
    const mode = editingMode.value
    if (!entry || !mode) { return }
    commitListeners.forEach(fn => fn(entry, mode))
    resetState()
  }

  function cancel() {
    if (editingMode.value === 'update' && editingEntry.value && backup) {
      restoreBackup(editingEntry.value)
    }
    cancelListeners.forEach(fn => fn())
    resetState()
  }

  function remove() {
    const entry = editingEntry.value
    if (!entry) { return }
    deleteListeners.forEach(fn => fn(entry))
    resetState()
  }

  function setHovered(meshUuid: string, intersection: Intersection | null) {
    // During a thumbnail drag any mesh may propose (scrub-across); outside
    // of a drag the lock keeps unrelated meshes from stealing the ring.
    const isThumbnailDrag = dragTextureIndex.value !== null
    if (!isThumbnailDrag && !canActOn(meshUuid)) { return }
    if (intersection) { proposals.set(meshUuid, intersection) }
    else { proposals.delete(meshUuid) }
    resolveHoverFromProposals()
  }

  function clearHovered(meshUuid: string) {
    proposals.delete(meshUuid)
    resolveHoverFromProposals()
  }

  function setCursor(x: number, y: number) {
    cursorNdc.x = x
    cursorNdc.y = y
  }

  function setScreenAnchor(x: number, y: number) {
    screenAnchor.x = x
    screenAnchor.y = y
  }

  function setNextZIndex(meshUuid: string, n: number) {
    nextZIndexByMesh[meshUuid] = Math.max(0, n)
  }
  function getNextZIndex(meshUuid: string): number {
    return nextZIndexByMesh[meshUuid] ?? 0
  }
  function setUiDragging(active: boolean) { isUiDragging.value = active }
  function setCursorOnTarget(on: boolean) { isCursorOnTarget.value = on }

  function setDragTextureIndex(index: number | null) {
    dragTextureIndex.value = index !== null && index >= 0 ? index : null
  }

  function setHoveredEntry(entry: DecalEntry) {
    enteredEntries.add(entry)
    recomputeHovered()
  }

  function clearHoveredEntry(entry: DecalEntry) {
    enteredEntries.delete(entry)
    recomputeHovered()
  }

  function setScale(n: number) { scale.value = n }
  function setAngle(rad: number) { angle.value = rad }

  function setZIndex(n: number) {
    if (!editingEntry.value) { return }
    const next = Math.max(0, n)
    if (editingEntry.value.zIndex === next) { return }
    editingEntry.value.zIndex = next
    triggerRef(editingEntry)
  }

  function changeZIndex(delta: number) {
    if (!editingEntry.value) { return }
    setZIndex(editingEntry.value.zIndex + delta)
  }

  function setFlipX(value: boolean) {
    if (!editingEntry.value) { return }
    if (editingEntry.value.flipX === value) { return }
    editingEntry.value.flipX = value
    triggerRef(editingEntry)
  }

  function setFlipY(value: boolean) {
    if (!editingEntry.value) { return }
    if (editingEntry.value.flipY === value) { return }
    editingEntry.value.flipY = value
    triggerRef(editingEntry)
  }

  function toggleFlipX() {
    if (!editingEntry.value) { return }
    setFlipX(!editingEntry.value.flipX)
  }

  function toggleFlipY() {
    if (!editingEntry.value) { return }
    setFlipY(!editingEntry.value.flipY)
  }

  function setColor(value: string | null) {
    if (!editingEntry.value) { return }
    if (editingEntry.value.color === value) { return }
    editingEntry.value.color = value
    triggerRef(editingEntry)
  }

  function setOpacity(value: number | null) {
    if (!editingEntry.value) { return }
    const clamped = value === null ? null : Math.min(1, Math.max(0, value))
    if (editingEntry.value.opacity === clamped) { return }
    editingEntry.value.opacity = clamped
    triggerRef(editingEntry)
  }

  function setTextureIndex(n: number) {
    if (textureCount.value <= 0) { textureIndex.value = 0; return }
    textureIndex.value = ((n % textureCount.value) + textureCount.value) % textureCount.value
  }

  function setTextureCount(n: number) {
    textureCount.value = Math.max(0, n)
    if (textureIndex.value >= textureCount.value) { textureIndex.value = 0 }
  }

  function nextTexture() {
    if (textureCount.value < 2) { return }
    setTextureIndex(textureIndex.value + 1)
  }

  function prevTexture() {
    if (textureCount.value < 2) { return }
    setTextureIndex(textureIndex.value - 1)
  }

  function registerDecalEntry(id: string, actions: DecalEntryActions) {
    entryActionsRegistry.set(id, actions)
  }
  function unregisterDecalEntry(id: string) {
    entryActionsRegistry.delete(id)
  }

  function getEntryActions(id: string, caller: string): DecalEntryActions | null {
    const actions = entryActionsRegistry.get(id)
    if (!actions) {
      console.warn(`[cientos] ${caller}: no decal registered with id "${id}".`)
      return null
    }
    return actions
  }

  function beginEditById(id: string): boolean {
    const actions = getEntryActions(id, 'beginEditById')
    if (!actions) { return false }
    actions.beginEdit()
    return true
  }

  function setZIndexById(id: string, newZ: number): boolean {
    // In-flight edit: mutate editingEntry live so the user's pending
    // position/scale/rotation aren't lost — writing through to data would
    // snap the decal back to its pre-edit geometry. Commit folds the
    // zIndex change into data along with the rest of the edit.
    const clamped = Math.max(0, newZ)
    if (editingEntry.value && editingEntry.value.id === id) {
      if (editingEntry.value.zIndex !== clamped) {
        editingEntry.value.zIndex = clamped
        triggerRef(editingEntry)
      }
      return true
    }
    const actions = getEntryActions(id, 'setZIndexById')
    if (!actions) { return false }
    actions.setZIndex(clamped)
    return true
  }

  function setVisibilityById(id: string, visible: boolean): boolean {
    // In-flight edit: mutate editingEntry only. Writing through to data
    // would re-emit `update:data` from the pre-edit snapshot, snapping
    // the decal back to its old position/scale/rotation on the next
    // rebuildEntries pass. Commit folds visibility in with the rest.
    const next = !!visible
    if (editingEntry.value && editingEntry.value.id === id) {
      if (editingEntry.value.visible !== next) {
        editingEntry.value.visible = next
        triggerRef(editingEntry)
      }
      return true
    }
    const actions = getEntryActions(id, 'setVisibilityById')
    if (!actions) { return false }
    actions.setVisibility(next)
    return true
  }

  function removeById(id: string): boolean {
    // Editing this entry — route through the editor `remove()` so the
    // delete listener fires with the live entry (preserving in-flight
    // geometry on the emitted `delete` event) and resetState clears the
    // dangling editingEntry reference.
    if (editingEntry.value && editingEntry.value.id === id) {
      remove()
      return true
    }
    const actions = getEntryActions(id, 'removeById')
    if (!actions) { return false }
    actions.remove()
    return true
  }

  function setHoveredById(id: string, on: boolean): boolean {
    const actions = getEntryActions(id, 'setHoveredById')
    if (!actions) { return false }
    actions.setHovered(on)
    return true
  }

  const meshNameByUuid = new Map<string, string>()
  function registerDecalData(meshUuid: string, meshName: string | null, setter: DecalDataSetter) {
    dataSetterRegistry.set(meshUuid, setter)
    if (meshName) {
      dataSetterByMeshName.set(meshName, setter)
      meshNameByUuid.set(meshUuid, meshName)
    }
  }
  function unregisterDecalData(meshUuid: string) {
    dataSetterRegistry.delete(meshUuid)
    const name = meshNameByUuid.get(meshUuid)
    if (name) {
      dataSetterByMeshName.delete(name)
      meshNameByUuid.delete(meshUuid)
    }
  }

  function applyImportedLayout(layout: Record<string, DecalJsonEntry[]>) {
    for (const [name, entries] of Object.entries(layout)) {
      const setter = dataSetterByMeshName.get(name)
      if (setter) { setter(entries) }
    }
  }

  function setMeshData(meshName: string, entries: DecalJsonEntry[], opts?: DecalDataSetterOpts): boolean {
    const setter = dataSetterByMeshName.get(meshName)
    if (!setter) {
      console.warn(`[cientos] setMeshData: no <Decal> registered for mesh "${meshName}".`)
      return false
    }
    // Fold the in-flight edit's geometry into the rewrite — callers
    // build `entries` from layout snapshots which don't include in-memory
    // position/orientation/size mutations. Without this merge a bulk
    // reorder would reset the editing decal to its pre-edit pose.
    const editing = editingEntry.value
    const editingMeshUuid = lockedMeshUuid.value
    const editingMeshName = editingMeshUuid ? meshNameByUuid.get(editingMeshUuid) : null
    if (editing && editingMeshName === meshName) {
      entries = entries.map((e) => {
        if (e.id !== editing.id) { return e }
        return {
          ...e,
          position: [editing.position.x, editing.position.y, editing.position.z],
          orientation: [editing.orientation.x, editing.orientation.y, editing.orientation.z],
          size: [editing.size.x, editing.size.y, editing.size.z],
        }
      })
    }
    setter(entries, opts)
    return true
  }

  function recordHistory(meshUuid: string, before: DecalJsonEntry[], after: DecalJsonEntry[]) {
    if (before === after) { return }
    const next = undoStack.value.concat({ uuid: meshUuid, before, after })
    undoStack.value = next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next
    redoStack.value = []
  }

  function undo(): boolean {
    const stack = undoStack.value
    if (stack.length === 0) { return false }
    const op = stack[stack.length - 1]
    const setter = dataSetterRegistry.get(op.uuid)
    if (!setter) {
      console.warn(`[cientos] undo: no <Decal> currently bound to mesh "${op.uuid}". History entry skipped.`)
      undoStack.value = stack.slice(0, -1)
      return false
    }
    setter(op.before)
    undoStack.value = stack.slice(0, -1)
    redoStack.value = redoStack.value.concat(op)
    return true
  }

  function redo(): boolean {
    const stack = redoStack.value
    if (stack.length === 0) { return false }
    const op = stack[stack.length - 1]
    const setter = dataSetterRegistry.get(op.uuid)
    if (!setter) {
      console.warn(`[cientos] redo: no <Decal> currently bound to mesh "${op.uuid}". History entry skipped.`)
      redoStack.value = stack.slice(0, -1)
      return false
    }
    setter(op.after)
    redoStack.value = stack.slice(0, -1)
    undoStack.value = undoStack.value.concat(op)
    return true
  }

  const canUndo = computed(() => undoStack.value.length > 0)
  const canRedo = computed(() => redoStack.value.length > 0)

  return {
    editingEntry,
    editingMode,
    lockedMeshUuid,
    hoveredIntersection,
    hoveredMeshUuid,
    cursorNdc,
    scale,
    angle,
    screenAnchor,
    textureIndex,
    textureCount,
    nextZIndexByMesh,
    isUiDragging,
    isCursorOnTarget,
    dragTextureIndex,
    hoveredEntry,
    baseOrientation,

    canActOn,
    isEditing,

    beginCreate,
    beginEdit,
    transferCreate,
    commit,
    cancel,
    remove,

    setHovered,
    clearHovered,
    setCursor,
    setScreenAnchor,
    setScale,
    setAngle,
    setZIndex,
    changeZIndex,
    setTextureIndex,
    setTextureCount,
    setNextZIndex,
    getNextZIndex,
    setUiDragging,
    setCursorOnTarget,
    setDragTextureIndex,
    setHoveredEntry,
    clearHoveredEntry,
    setFlipX,
    setFlipY,
    toggleFlipX,
    toggleFlipY,
    setColor,
    setOpacity,
    nextTexture,
    prevTexture,

    registerDecalEntry,
    unregisterDecalEntry,
    beginEditById,
    setZIndexById,
    setVisibilityById,
    removeById,
    setHoveredById,

    registerDecalData,
    unregisterDecalData,
    recordHistory,
    applyImportedLayout,
    setMeshData,
    canUndo,
    canRedo,
    undo,
    redo,

    onCommit: fn => subscribe(commitListeners, fn),
    onDelete: fn => subscribe(deleteListeners, fn),
    onCancel: fn => subscribe(cancelListeners, fn),
  }
}

/** Get-or-create the canvas-scoped session. Called by `<Decal>` setup. */
export function provideDecalEditor(): DecalEditorSession {
  const ctx = useTresContext()
  let session = sessions.get(ctx)
  if (!session) {
    session = createSession()
    sessions.set(ctx, session)
  }
  return session
}

/** Read the canvas-scoped session. Throws when called before a `<Decal>` mounts. */
export function useDecalEditor(): DecalEditorSession {
  const ctx = useTresContext()
  const session = sessions.get(ctx)
  if (!session) {
    throw new Error(
      '[cientos] useDecalEditor() must be called inside a <TresCanvas> after a <Decal> has been mounted.',
    )
  }
  return session
}
