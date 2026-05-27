<script setup lang="ts">
/**
 * Renders one stamped decal. Owns its mesh geometry/material lifecycle and
 * the edges helper (visible on hover). Delegates hover/edit state to the
 * shared session — never holds local hover state, otherwise two co-planar
 * decals could end up "hovered" at once if pmndrs dispatches enter to both.
 */
import { computed, onBeforeUnmount, shallowRef, watch } from 'vue'
import type { BufferGeometry, LineSegments, Mesh, MeshBasicMaterial } from 'three'
import { EdgesGeometry } from 'three'
import { useLoop } from '@tresjs/core'
import { invalidateDecalGeometry, updateDecalGeometry } from './DecalGeometry'
import { useDecalEditor } from './useDecalEditor'
import type { DecalEntry } from './useDecalEditor'

const props = withDefaults(defineProps<{
  parent: Mesh
  entry: DecalEntry
  editable: boolean
  /** Forwarded to {@link updateDecalGeometry}'s `baseOffset` option. */
  baseOffset?: number
  /** Forwarded to {@link updateDecalGeometry}'s `layerGap` option. */
  layerGap?: number
  /** Forwarded to {@link updateDecalGeometry}'s `cullThreshold` option. */
  cullThreshold?: number
  /** Color of the hover edges outline. */
  edgeColor?: string
}>(), {
  edgeColor: '#0000ff',
})

const emit = defineEmits<{
  (e: 'click', payload: { entry: DecalEntry, event: MouseEvent }): void
  (e: 'hover', hovered: boolean): void
}>()

const session = useDecalEditor()

const meshRef = shallowRef<Mesh | null>(null)
const edgesRef = shallowRef<LineSegments | null>(null)
const edgesGeometry = shallowRef<EdgesGeometry | null>(null)

const isHovered = computed(() => session.hoveredEntry.value === props.entry)
const isEditingThis = computed(() => session.editingEntry.value === props.entry)
const showEdges = computed(() => isHovered.value && !isEditingThis.value)

// Three.js raycasts Lines with a 1-unit threshold — pmndrs would
// otherwise bubble a phantom hover from the edges to the parent.
const noRaycast = () => {}
watch(edgesRef, (line) => {
  if (line) { line.raycast = noRaycast }
}, { immediate: true })

function rebuildEdges(source?: BufferGeometry | null) {
  const geometry = source ?? meshRef.value?.geometry
  if (!geometry) { return }
  const old = edgesGeometry.value
  edgesGeometry.value = new EdgesGeometry(geometry)
  old?.dispose()
}

interface MaterialOriginal {
  colorHex?: number
  opacity?: number
  transparent?: boolean
  appliedColor?: string | null
  appliedOpacity?: number | null
}

function syncMaterial(entry: DecalEntry) {
  const mesh = meshRef.value
  const material = mesh?.material as MeshBasicMaterial | undefined
  if (!material) { return }
  let needsUpdate = false
  if (material.map !== entry.map) {
    material.map = entry.map
    needsUpdate = true
  }
  // Follow zIndex live: the template binding only fires on entry-ref
  // swap (post-commit), but `entry.zIndex` mutates in place mid-edit.
  const desiredOffset = -(10 + entry.zIndex)
  if (material.polygonOffsetFactor !== desiredOffset) {
    material.polygonOffsetFactor = desiredOffset
    needsUpdate = true
  }

  // First sync stashes the material's pristine color/opacity so we can
  // restore them when the entry resets `color`/`opacity` to null.
  const stash = (material.userData as { decalOriginal?: MaterialOriginal }).decalOriginal
    ?? ((material.userData as { decalOriginal?: MaterialOriginal }).decalOriginal = {
      colorHex: material.color?.getHex(),
      opacity: material.opacity,
      transparent: material.transparent,
    } as MaterialOriginal)

  if (material.color) {
    const target = entry.color ?? null
    if (target !== stash.appliedColor) {
      if (target) { material.color.set(target) }
      else if (stash.colorHex !== undefined) { material.color.setHex(stash.colorHex) }
      stash.appliedColor = target
      needsUpdate = true
    }
  }

  const targetOpacity = entry.opacity ?? null
  if (targetOpacity !== stash.appliedOpacity) {
    if (targetOpacity !== null) {
      material.opacity = targetOpacity
      material.transparent = true
    }
    else {
      if (stash.opacity !== undefined) { material.opacity = stash.opacity }
      if (stash.transparent !== undefined) { material.transparent = stash.transparent }
    }
    stash.appliedOpacity = targetOpacity
    needsUpdate = true
  }

  if (needsUpdate) { material.needsUpdate = true }
}

function build(entry: DecalEntry) {
  const mesh = meshRef.value
  if (!mesh) { return }
  // When `:mesh` is used, the decal mesh lives elsewhere in the Vue tree
  // than the target — re-parent so transforms inherit via the scene graph.
  // Invalidate the cache because vertices must rebake in the new
  // parent-local space.
  if (mesh.parent !== props.parent) {
    invalidateDecalGeometry(mesh)
    props.parent.add(mesh)
  }
  updateDecalGeometry(mesh, props.parent, entry, {
    baseOffset: props.baseOffset,
    layerGap: props.layerGap,
    cullThreshold: props.cullThreshold,
  })
  mesh.position.set(0, 0, 0)
  mesh.rotation.set(0, 0, 0)
  mesh.scale.set(1, 1, 1)
  mesh.renderOrder = entry.zIndex
  mesh.visible = entry.visible !== false
  syncMaterial(entry)
}

watch(meshRef, (mesh) => {
  if (!mesh) { return }
  build(props.entry)
  rebuildEdges(mesh.geometry)
}, { immediate: true })

watch(() => props.entry, (entry) => {
  if (!entry || !meshRef.value || isEditingThis.value) { return }
  build(entry)
  rebuildEdges()
})

// Options aren't part of the cache key — invalidate on runtime change.
watch(() => [props.baseOffset, props.layerGap, props.cullThreshold], () => {
  if (meshRef.value) { invalidateDecalGeometry(meshRef.value) }
  if (props.entry && meshRef.value) {
    build(props.entry)
    rebuildEdges()
  }
})

// Per-frame rebuild only while editing — geometry follows entry mutations.
const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  if (!isEditingThis.value) { return }
  const entry = session.editingEntry.value
  if (entry) { build(entry) }
})

watch(isEditingThis, (now, prev) => {
  if (prev && !now) {
    build(props.entry)
    rebuildEdges()
  }
})

function onClick(event: MouseEvent) {
  event.stopPropagation?.()
  // Click follows the visual hover: when two coplanar decals overlap,
  // pmndrs sometimes synthesises the click against the back one.
  const hovered = session.hoveredEntry.value
  if (hovered && hovered !== props.entry) { return }
  emit('click', { entry: props.entry, event })
}

function setBodyCursor(value: string) {
  if (typeof document !== 'undefined') { document.body.style.cursor = value }
}

function onEnter(event: PointerEvent) {
  event.stopPropagation?.()
  if (!props.editable) { return }
  session.setHoveredEntry(props.entry)
  emit('hover', true)
  setBodyCursor('pointer')
}

function onLeave() {
  if (!props.editable) { return }
  session.clearHoveredEntry(props.entry)
  emit('hover', false)
  setBodyCursor('')
}

onBeforeUnmount(() => {
  edgesGeometry.value?.dispose()
  edgesGeometry.value = null
  session.clearHoveredEntry(props.entry)
  setBodyCursor('')
  const mesh = meshRef.value
  if (mesh) {
    // Geometry is built imperatively, so TresJS's auto-dispose won't
    // catch it. Same for the parent — we may have re-parented to the
    // target mesh, and TresJS's cleanup only knows about the declared slot.
    mesh.geometry?.dispose()
    invalidateDecalGeometry(mesh)
    mesh.parent?.remove(mesh)
  }
})

defineExpose({ instance: meshRef })
</script>

<template>
  <TresMesh
    ref="meshRef"
    :name="`decal-${entry.id}`"
    :render-order="entry.zIndex"
    :material-transparent="true"
    :material-polygonOffset="true"
    :material-polygonOffsetFactor="-(10 + entry.zIndex)"
    :material-depthTest="true"
    @click="onClick"
    @pointerenter="onEnter"
    @pointerleave="onLeave"
  >
    <slot>
      <TresMeshBasicMaterial />
    </slot>

    <TresLineSegments
      v-if="edgesGeometry"
      ref="edgesRef"
      :geometry="edgesGeometry"
      :visible="showEdges"
      :name="`decal-${entry.id}-edges`"
    >
      <TresLineBasicMaterial
        :color="edgeColor"
        :depth-test="false"
        :transparent="true"
      />
    </TresLineSegments>
  </TresMesh>
</template>
