<script setup lang="ts">
/**
 * Mounted by `<Decal>` only when `editable=true`. Owns all the interactive
 * logic: native pointer events on the canvas, raycast, hover-line debug,
 * drag-from-thumbnail live preview, and mutations of the in-flight entry.
 * Talks exclusively through the shared session.
 */
import { computed, ref, shallowRef, watch } from 'vue'
import type { Intersection, Line, Mesh, Texture } from 'three'
import { Euler, Matrix4, Object3D, Raycaster, Vector2, Vector3 } from 'three'
import { useLoop, useTres } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'
import { useDecalEditor } from './useDecalEditor'
import type { DecalEntry } from './useDecalEditor'
import { getTextureAspect } from './DecalGeometry'

const props = withDefaults(defineProps<{
  parent: Mesh
  textures: Texture[]
  baseSize?: number
}>(), {
  baseSize: 1,
})

const session = useDecalEditor()
const { renderer, camera } = useTres()

const meshUuid = computed(() => props.parent.uuid)
const currentTexture = computed<Texture | null>(
  () => props.textures[session.textureIndex.value] ?? props.textures[0] ?? null,
)

const raycaster = new Raycaster()
const cursorVec = new Vector2()
const dragStart = new Vector2()
const tmpNormal = new Vector3()
const tmpProject = new Vector3()
const tmpWorldEnd = new Vector3()
const tmpLocalA = new Vector3()
const tmpLocalB = new Vector3()
const tmpInverse = new Matrix4()
const orientationDummy = new Object3D()

const lineRef = shallowRef<Line | null>(null)
const showHoverLine = ref(false)

let isDragging = false
// pmndrs's pointerdown runs before our overlay's, which may reset the
// session — without this flag the subsequent `click` would create a new decal.
let suppressNextClick = false

const DRAG_THRESHOLD_SQ = 25

function ndcFromEvent(event: MouseEvent): { x: number, y: number } | null {
  const target = renderer?.domElement
  if (!target) { return null }
  const rect = target.getBoundingClientRect()
  return {
    x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
    y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
  }
}

function projectToScreen(point: Vector3) {
  const cam = camera.value
  const canvas = renderer?.domElement
  if (!cam || !canvas) { return }
  tmpProject.copy(point).project(cam)
  // Window-coords (clientRect-relative) so the Handle, which sits in
  // `position: fixed`, can place itself directly without knowing where
  // the canvas lives on the page.
  const rect = canvas.getBoundingClientRect()
  const sx = rect.left + (tmpProject.x * 0.5 + 0.5) * rect.width
  const sy = rect.top + (-(tmpProject.y * 0.5 - 0.5)) * rect.height
  session.setScreenAnchor(sx, sy)
}

function raycast(): Intersection | null {
  const cam = camera.value
  if (!cam) { return null }
  cursorVec.set(session.cursorNdc.x, session.cursorNdc.y)
  raycaster.setFromCamera(cursorVec, cam)
  return raycaster.intersectObject(props.parent, false)[0] ?? null
}

function updateBaseOrientation(hit: Intersection) {
  if (!hit.face) { return }
  tmpNormal.copy(hit.face.normal).transformDirection(props.parent.matrixWorld).normalize()
  orientationDummy.position.copy(hit.point)
  orientationDummy.lookAt(tmpNormal.add(hit.point))
  session.baseOrientation.copy(orientationDummy.rotation)
}

function applyOrientation(entry: DecalEntry) {
  entry.orientation.copy(session.baseOrientation)
  entry.orientation.z += session.angle.value
}

function applySize(entry: DecalEntry) {
  fillAspectSize(entry.map, entry.size)
}

function fillOrientationAtHit(hit: Intersection, out: Euler) {
  updateBaseOrientation(hit)
  out.copy(session.baseOrientation)
  out.z += session.angle.value
}

// Allocates fresh Vector3/Euler so the session can clone them without
// aliasing our scratch buffers; also syncs the screen anchor.
function buildInitFromHit(hit: Intersection, tex: Texture | null) {
  const orientation = new Euler()
  fillOrientationAtHit(hit, orientation)
  const size = new Vector3()
  fillAspectSize(tex, size)
  projectToScreen(hit.point)
  return {
    position: hit.point,
    orientation,
    size,
    map: tex,
    zIndex: session.getNextZIndex(meshUuid.value),
  }
}

function fillAspectSize(tex: Texture | null, out: Vector3) {
  const base = props.baseSize
  const scale = session.scale.value
  const { x, y } = getTextureAspect(tex)
  out.set(x * base * scale, y * base * scale, base)
}

function isLocked() {
  return session.lockedMeshUuid.value === meshUuid.value
}

function updateHoverLine(hit: Intersection | null) {
  const line = lineRef.value
  if (!line) { return }
  if (!hit?.point || !hit.face) {
    showHoverLine.value = false
    return
  }
  tmpNormal.copy(hit.face.normal).transformDirection(props.parent.matrixWorld).normalize()
  tmpWorldEnd.copy(hit.point).add(tmpNormal)

  const lineParent = line.parent
  if (lineParent) {
    tmpInverse.copy(lineParent.matrixWorld).invert()
    tmpLocalA.copy(hit.point).applyMatrix4(tmpInverse)
    tmpLocalB.copy(tmpWorldEnd).applyMatrix4(tmpInverse)
  }
  else {
    tmpLocalA.copy(hit.point)
    tmpLocalB.copy(tmpWorldEnd)
  }

  const positions = line.geometry.attributes.position
  if (!positions) {
    line.geometry.setFromPoints([tmpLocalA.clone(), tmpLocalB.clone()])
  }
  else {
    positions.setXYZ(0, tmpLocalA.x, tmpLocalA.y, tmpLocalA.z)
    positions.setXYZ(1, tmpLocalB.x, tmpLocalB.y, tmpLocalB.z)
    positions.needsUpdate = true
  }
  showHoverLine.value = true
}

// Pre-allocate so subsequent setXYZ updates find the attribute in place.
watch(lineRef, (line) => {
  if (line) { line.geometry.setFromPoints([new Vector3(), new Vector3()]) }
}, { immediate: true })

// Sync flush so our line hides immediately when another editor wins.
watch(() => session.hoveredMeshUuid.value, () => {
  if (session.hoveredMeshUuid.value === meshUuid.value) {
    updateHoverLine(session.hoveredIntersection.value)
  }
  else {
    updateHoverLine(null)
  }
}, { flush: 'sync' })

// Idle gate — skip the frame when nothing relevant changed.
let lastCursorX = Number.NaN
let lastCursorY = Number.NaN
let lastCanAct = false
let lastEditingEntry: DecalEntry | null = null

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  const canAct = session.canActOn(meshUuid.value)
  const entry = session.editingEntry.value
  const cx = session.cursorNdc.x
  const cy = session.cursorNdc.y
  if (
    canAct === lastCanAct
    && entry === lastEditingEntry
    && cx === lastCursorX
    && cy === lastCursorY
  ) {
    return
  }
  lastCanAct = canAct
  lastEditingEntry = entry
  lastCursorX = cx
  lastCursorY = cy

  if (!canAct) {
    updateHoverLine(null)
    return
  }
  const hit = raycast()

  if (entry && isLocked()) {
    session.setCursorOnTarget(!!hit?.point && !!hit.face)
    if (session.editingMode.value === 'create') { updateHoverLine(hit) }
    else { updateHoverLine(null) }
    projectToScreen(entry.position)
    return
  }

  // Every editor proposes its hit; the session keeps the closest.
  if (hit) { session.setHovered(meshUuid.value, hit) }
  else { session.clearHovered(meshUuid.value) }

  if (session.hoveredMeshUuid.value === meshUuid.value) {
    updateHoverLine(session.hoveredIntersection.value)
  }
  else {
    updateHoverLine(null)
  }
})

// Move the entry only while the UI handle is being dragged — idle
// pointer movement must not displace a placed decal.
watch([() => session.cursorNdc.x, () => session.cursorNdc.y], () => {
  const entry = session.editingEntry.value
  if (!entry || !isLocked() || !session.isUiDragging.value) { return }
  const hit = raycast()
  if (!hit?.point || !hit.face) { return }
  entry.position.copy(hit.point)
  updateBaseOrientation(hit)
  applyOrientation(entry)
})

watch(() => session.angle.value, () => {
  const entry = session.editingEntry.value
  if (entry && isLocked()) { applyOrientation(entry) }
})

watch(() => session.scale.value, () => {
  const entry = session.editingEntry.value
  if (entry && isLocked()) { applySize(entry) }
})

watch(currentTexture, (tex) => {
  const entry = session.editingEntry.value
  if (!entry || !isLocked()) { return }
  entry.map = tex
  applySize(entry)
})

const canvasTarget = () => renderer?.domElement ?? null

useEventListener(canvasTarget, 'pointerdown', (event: PointerEvent) => {
  isDragging = false
  dragStart.set(event.clientX, event.clientY)
  suppressNextClick = !!session.editingEntry.value
  const ndc = ndcFromEvent(event)
  if (ndc) { session.setCursor(ndc.x, ndc.y) }
})

useEventListener(canvasTarget, 'pointermove', (event: PointerEvent) => {
  const ndc = ndcFromEvent(event)
  if (!ndc) { return }
  session.setCursor(ndc.x, ndc.y)
  if (event.buttons !== 0) {
    const dx = event.clientX - dragStart.x
    const dy = event.clientY - dragStart.y
    if (dx * dx + dy * dy > DRAG_THRESHOLD_SQ) { isDragging = true }
  }
})

// Each editor races to raycast its own mesh; the topmost wins. If the
// in-flight create lives on another mesh, `transferCreate` hands it over
// so the preview can scrub across meshes without releasing the drag.
useEventListener(canvasTarget, 'dragover', (event: DragEvent) => {
  const index = session.dragTextureIndex.value
  if (index === null) { return }
  event.preventDefault()
  if (event.dataTransfer) { event.dataTransfer.dropEffect = 'copy' }
  const ndc = ndcFromEvent(event)
  if (ndc) { session.setCursor(ndc.x, ndc.y) }

  const hit = raycast()
  if (!hit?.point || !hit.face) {
    // Drop our stale proposal so a previous-frame hit doesn't keep winning.
    session.clearHovered(meshUuid.value)
    return
  }

  session.setHovered(meshUuid.value, hit)
  if (session.hoveredMeshUuid.value !== meshUuid.value) { return }

  const tex = props.textures[index] ?? null
  const existing = session.editingEntry.value

  if (!existing) {
    session.setTextureIndex(index)
    session.beginCreate(meshUuid.value, buildInitFromHit(hit, tex))
    return
  }

  if (session.editingMode.value !== 'create') { return }

  if (isLocked()) {
    existing.position.copy(hit.point)
    fillOrientationAtHit(hit, existing.orientation)
    fillAspectSize(existing.map, existing.size)
    projectToScreen(existing.position)
    return
  }

  // Topmost is this mesh but the create lives on another one — transfer.
  session.transferCreate(meshUuid.value, buildInitFromHit(hit, tex))
})

useEventListener(canvasTarget, 'drop', (event: DragEvent) => {
  if (session.dragTextureIndex.value === null) { return }
  event.preventDefault()
  // Only the editor owning the preview clears the drag flag.
  if (session.lockedMeshUuid.value && !isLocked()) { return }
  session.setDragTextureIndex(null)
})

useEventListener(canvasTarget, 'click', () => {
  if (suppressNextClick) { suppressNextClick = false; return }
  if (isDragging) { isDragging = false; return }
  if (!session.canActOn(meshUuid.value)) { return }
  if (session.editingEntry.value) { return }

  const hit = raycast()
  if (!hit?.point || !hit.face) { return }
  if (session.hoveredMeshUuid.value && session.hoveredMeshUuid.value !== meshUuid.value) { return }

  session.beginCreate(meshUuid.value, buildInitFromHit(hit, currentTexture.value))
})
</script>

<template>
  <TresLine
    ref="lineRef"
    :visible="showHoverLine"
    name="cientos-decal-hover-line"
  >
    <TresBufferGeometry />
    <TresLineBasicMaterial
      color="#0000ff"
      :depth-test="false"
      :transparent="true"
    />
  </TresLine>
  <slot></slot>
</template>
