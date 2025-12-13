<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, shallowRef, toRefs, watch } from 'vue'
import { Euler, Group, Matrix4, Mesh, Object3D, Raycaster, Vector2, Vector3 } from 'three'
import type { Intersection } from 'three'
import { useLoop, useTresContext } from '@tresjs/core'
import { useEventListener, useMouse } from '@vueuse/core'

import { decalBus } from './DecalBus'
import DecalItem from './DecalItem.vue'
import { getTextureNameForExport, updateDecalGeometry } from './DecalUtils'
import type { DecalData, DecalProps } from './DecalTypes'

const props = withDefaults(defineProps<DecalProps>(), {
  debug: false,
  depthTest: true,
  map: null,
  mesh: () => shallowRef(null),
  position: () => [-9999, -9999, -9999],
  orientation: () => [0, 0, 0],
  size: () => [1, 1, 1],
  normal: () => [0, 0, 0],
  polygonOffsetFactor: -10,
  order: () => Math.round(Math.random() * 100),
  data: () => [],
})

const { debug, depthTest, mesh, map, position, orientation, size, data } = toRefs(props)

const { onBeforeRender } = useLoop()
const { sizes, camera, renderer } = useTresContext()

const raycaster = shallowRef(new Raycaster())
const meshRef = shallowRef<Mesh | null>(null)
const meshLineRef = shallowRef<Mesh | null>(null)
const boxHelperRef = shallowRef<any>(null)

const dummyHelper = new Object3D()

const mouse = new Vector2()
const dragStart = new Vector2()
const isDragging = ref(false)
const { x: xMouse, y: yMouse } = useMouse({ touch: false })

const stampedDecals = ref<DecalData[]>([])
const editingDecal = ref<DecalData | null>(null)
const decalBackup = ref<Partial<DecalData> | null>(null)

const decalPosition = reactive(new Vector3(...position.value))
const decalOrientation = reactive(new Euler(...orientation.value))
const decalSize = reactive(new Vector3(...size.value))

const baseDecalSize = reactive(new Vector3(1, 1, 1))
const baseSize = ref(1)
const decalScale = ref(1)

const baseOrientation = reactive(new Euler())
const userOrientation = reactive(new Euler())

const currentIntersect = shallowRef<Intersection | null>(null)
const decalIntersect = shallowRef<Intersection | null>(null)

const currentIntersectIsEmpty = computed(() => currentIntersect.value === null)
const decalIntersectIsEmpty = computed(() => decalIntersect.value === null)

const currentTextureIndex = ref(0)
const isHoveringDecal = ref(false)
const hideBoxHelper = ref(false)

const currentParent = computed(() => {
  if (mesh.value) { return mesh.value }
  if (meshRef.value?.parent) { return meshRef.value.parent }
  return null
})

const maxZIndex = computed(() => Math.max(...stampedDecals.value.map(d => d.zIndex ?? 0), 0))

const textureList = computed<any[]>(() => {
  if (!map.value) { return [] }
  const list = Array.isArray(map.value) ? map.value : [map.value]

  for (const t of list) {
    if (!t?.name && t?.image?.src) {
      try {
        const src = t.image.src
        const filename = src.split('/').pop()?.split('?')[0]
        if (filename) { t.name = decodeURIComponent(filename) }
      }
      catch { /* noop */ }
    }
  }
  return list
})

const activeMap = computed(() => textureList.value[currentTextureIndex.value] || textureList.value[0])
const activeRenderOrder = computed(() => (editingDecal.value ? (editingDecal.value.zIndex ?? 0) : 9999))

const tmpVec3A = new Vector3()
const tmpVec3B = new Vector3()
const tmpMat4 = new Matrix4()

function clampTextureIndex() {
  if (currentTextureIndex.value >= textureList.value.length) { currentTextureIndex.value = 0 }
}

function getTextureByPath(pathName: string) {
  if (!textureList.value.length) { return null }
  const found = textureList.value.find(t => t?.name === pathName || t?.userData?.name === pathName)
  return found || textureList.value[0]
}

function applyUserOrientation(out: Euler) {
  out.copy(baseOrientation)
  out.x += userOrientation.x
  out.y += userOrientation.y
  out.z += userOrientation.z
  return out
}

function getScaledDecalSize(out = tmpVec3A) {
  out.set(
    baseDecalSize.x * decalScale.value,
    baseDecalSize.y * decalScale.value,
    decalSize.z,
  )
  return out
}

function setBaseDecalSizeFromTexture(tex: any) {
  const w = tex?.image?.width ?? 1
  const h = tex?.image?.height ?? 1
  const diag = Math.sqrt(w * w + h * h) || 1

  baseDecalSize.x = (w / diag) * baseSize.value
  baseDecalSize.y = (h / diag) * baseSize.value
  baseDecalSize.z = decalSize.z
}

function setIntersect(refIntersect: typeof currentIntersect, value: Intersection | null) {
  refIntersect.value = value
}

function resetIntersects() {
  setIntersect(currentIntersect, null)
  setIntersect(decalIntersect, null)
}

function ensureParentIsMesh() {
  if (!(currentParent.value instanceof Mesh)) {
    throw new TypeError('A Mesh parent is required for the decal or the "mesh" prop must be set.')
  }
}

function resetEditingState(options?: { restoreBackup?: boolean }) {
  if (options?.restoreBackup && editingDecal.value && decalBackup.value) {
    Object.assign(editingDecal.value, decalBackup.value)
  }

  editingDecal.value = null
  decalBackup.value = null
  hideBoxHelper.value = false

  resetIntersects()

  decalBus.emit({ type: 'ui-toggle-visibility-decal-intersect', visible: false })
  makeGeometryInitial()
  decalBus.emit({ type: 'refresh-raycasts' })
}

const syncDataToScene = () => {
  if (!data.value) { return }
  if (!textureList.value.length && data.value.length) { return }

  stampedDecals.value = data.value.map((entry: any) => {
    const pos = new Vector3(...entry.position)
    return {
      id: entry.id,
      position: pos,
      orientation: new Euler(...entry.orientation),
      size: new Vector3(...entry.size),
      zIndex: entry.zIndex,
      map: getTextureByPath(entry.map),
      object: meshRef.value,
      point: pos,
    } satisfies DecalData
  })
}

watch([() => data.value, textureList], syncDataToScene, { deep: true, immediate: true })

const getLayoutJson = () => ({
  decals: stampedDecals.value.map(d => ({
    id: d.id,
    position: d.position.toArray(),
    orientation: d.orientation.toArray().slice(0, 3),
    size: d.size.toArray(),
    zIndex: d.zIndex,
    map: getTextureNameForExport(d.map),
  })),
})

watch(decalIntersectIsEmpty, (isEmpty) => {
  if (!debug.value) { return }
  decalBus.emit({ type: 'ui-toggle-visibility-decal-intersect', visible: !isEmpty })
})

watch(currentIntersectIsEmpty, (isEmpty) => {
  if (!debug.value) { return }

  if (!editingDecal.value) {
    decalBus.emit({ type: 'ui-toggle-visibility-current-intersect', visible: !isEmpty })
    return
  }
  if (decalIntersectIsEmpty.value) { return }
  decalBus.emit({ type: 'ui-toggle-visibility-current-intersect', visible: !isEmpty })
})

watch(textureList, clampTextureIndex, { immediate: true })

watch([xMouse, yMouse, sizes.width, sizes.height], () => {
  if (!debug.value) { return }
  mouse.x = (xMouse.value / sizes.width.value) * 2 - 1
  mouse.y = -(xMouse.value ? (yMouse.value / sizes.height.value) : 0) * 2 + 1
  mouse.y = -(yMouse.value / sizes.height.value) * 2 + 1

  decalBus.emit({ type: 'cursor-move', x: mouse.x, y: mouse.y })
}, { immediate: true })

watch(meshLineRef, () => {
  if (!meshLineRef.value) { return }
  meshLineRef.value.geometry.setFromPoints([new Vector3(), new Vector3()])
}, { immediate: true })

function makeGeometryInitial() {
  const parent = currentParent.value
  const target = meshRef.value
  if (!parent || !target) { return }

  const tempDecalData: DecalData = {
    position: decalPosition,
    orientation: decalOrientation,
    size: decalSize,
    zIndex: 0,
  }
  updateDecalGeometry(target, parent as any, tempDecalData)
}

function makeGeometry() {
  const parent = currentParent.value
  const target = meshRef.value
  if (!parent || !target) { return }

  const decalHit = decalIntersect.value
  if (!editingDecal.value && (!decalHit?.point || !decalHit?.face)) { return }

  applyUserOrientation(decalOrientation)

  const originPoint = (editingDecal.value ? editingDecal.value.position : decalHit?.point) as Vector3 | undefined
  if (!originPoint) { return }

  const currentZ = editingDecal.value ? (editingDecal.value.zIndex ?? 0) : (maxZIndex.value + 10)

  const decalData: DecalData = {
    position: originPoint,
    orientation: decalOrientation,
    size: getScaledDecalSize(tmpVec3B),
    zIndex: currentZ,
  }

  updateDecalGeometry(target, parent as any, decalData)
}

watch(editingDecal, (isEditing) => {
  hideBoxHelper.value = !!isEditing
  if (isEditing) {
    makeGeometryInitial()
    setIntersect(decalIntersect, null)
  }
}, { immediate: true })

watch(meshRef, (val) => {
  if (!val) { return }
  ensureParentIsMesh()
  makeGeometryInitial()
})

const updateAspectRatio = async () => {
  const tex = activeMap.value
  if (!meshRef.value || !tex) { return }

  const mat = meshRef.value.material as any
  if (mat) {
    mat.map = tex
    mat.needsUpdate = true
  }

  await nextTick()

  setBaseDecalSizeFromTexture(tex)

  if (editingDecal.value) {
    editingDecal.value.map = tex
    editingDecal.value.size.copy(getScaledDecalSize(new Vector3()))
  }

  makeGeometry()
}

watch(activeMap, updateAspectRatio, { immediate: true })

function onSelectDecal(decal: DecalData) {
  if (editingDecal.value?.id === decal.id) { return }
  if (editingDecal.value) { decalBus.emit({ type: 'cancel-edit' }) }

  if (decal.map && textureList.value.length > 1) {
    const foundIndex = textureList.value.findIndex(t => t.uuid === decal.map?.uuid)
    if (foundIndex !== -1) { currentTextureIndex.value = foundIndex }
  }

  if (decal.map) { setBaseDecalSizeFromTexture(decal.map) }

  decalBackup.value = { ...decal }
  decal.zIndex = maxZIndex.value + 1
  editingDecal.value = decal
  setIntersect(decalIntersect, null)

  const denom = baseDecalSize.x || 1e-6
  const currentScaleValue = decal.size.x / denom
  decalScale.value = currentScaleValue

  raycaster.value.setFromCamera(mouse, camera.activeCamera.value)
  const parent = currentParent.value
  const intersects = parent ? raycaster.value.intersectObject(parent, false) : []

  if (intersects.length > 0) {
    const { point, face } = intersects[0]
    const n = face!.normal.clone().transformDirection((parent as any).matrixWorld)
    const lookAtTarget = point!.clone().add(n)

    dummyHelper.position.copy(point!)
    dummyHelper.lookAt(lookAtTarget)
    baseOrientation.copy(dummyHelper.rotation)
  }
  else {
    baseOrientation.copy(decal.orientation)
  }

  const angleZ = decal.orientation.z - baseOrientation.z
  userOrientation.set(0, 0, angleZ)

  decalOrientation.copy(baseOrientation)
  decalOrientation.z += userOrientation.z

  const uiAngle = -angleZ - Math.PI / 2
  const screenPosition = decal.position.clone()
  screenPosition.project(camera.activeCamera.value)

  const x = (screenPosition.x * 0.5 + 0.5) * sizes.width.value
  const y = -(screenPosition.y * 0.5 - 0.5) * sizes.height.value

  decalBus.emit({ type: 'ui-toggle-visibility-decal-intersect', visible: true })
  decalBus.emit({
    type: 'set-ui-state',
    scale: currentScaleValue,
    angle: uiAngle,
    x,
    y,
    id: decal.id!,
    textureCount: textureList.value.length,
  })

  makeGeometry()
}

const onClickDebug = async () => {
  if (currentIntersectIsEmpty.value) { return }
  decalBus.emit({ type: 'click', textureCount: textureList.value.length })
  await nextTick()
  updateAspectRatio()
  makeGeometry()
}

const validateDecal = async () => {
  if (!meshRef.value) { return }
  ensureParentIsMesh()

  if (!editingDecal.value && decalIntersectIsEmpty.value) { return }

  if (editingDecal.value) {
    const index = stampedDecals.value.findIndex(d => d.id === editingDecal.value!.id)
    if (index !== -1) {
      const d = stampedDecals.value[index]
      d.position.copy(editingDecal.value.position)
      d.orientation.copy(editingDecal.value.orientation)
      d.size.copy(editingDecal.value.size)
      d.map = activeMap.value
    }
  }
  else {
    const hit = decalIntersect.value
    if (hit?.point) {
      const newId = crypto.randomUUID()
      stampedDecals.value.push({
        ...(hit as any),
        position: hit.point.clone(),
        orientation: decalOrientation.clone(),
        size: getScaledDecalSize(new Vector3()),
        id: newId,
        zIndex: maxZIndex.value + 1,
        map: activeMap.value,
      })
    }
  }

  editingDecal.value = null
  userOrientation.set(0, 0, 0)
  decalScale.value = 1
  setIntersect(decalIntersect, null)
  makeGeometryInitial()
}

onBeforeRender(() => {
  if (!debug.value) { return }
  if (!meshLineRef.value || !meshRef.value) { return }

  const parent = currentParent.value
  if (!parent) { return }

  raycaster.value.setFromCamera(mouse, camera.activeCamera.value)
  const intersects = raycaster.value.intersectObjects([parent], false)

  if (!intersects.length) {
    setIntersect(currentIntersect, null)
    return
  }

  const first = intersects[0]
  const { object, point, face } = first

  if (object.uuid !== (parent as any).uuid && decalIntersectIsEmpty.value) {
    hideBoxHelper.value = true
    return
  }

  if (editingDecal.value) { return }

  hideBoxHelper.value = false
  if (!boxHelperRef.value || !point || !face) { return }

  setIntersect(currentIntersect, first)

  const worldNormal = face.normal.clone().transformDirection((parent as any).matrixWorld).normalize()
  const { depth } = boxHelperRef.value.geometry.parameters
  const lookAtTarget = point.clone().add(worldNormal.clone().multiplyScalar(depth))

  const helperParent = boxHelperRef.value.parent
  const helperParentInverse = helperParent ? tmpMat4.copy(helperParent.matrixWorld).invert() : tmpMat4.identity()

  const localPoint = tmpVec3A.copy(point).applyMatrix4(helperParentInverse)
  boxHelperRef.value.position.copy(localPoint)
  boxHelperRef.value.lookAt(lookAtTarget)

  const linePositions = meshLineRef.value.geometry.attributes.position
  const localLookAt = tmpVec3B.copy(lookAtTarget).applyMatrix4(helperParentInverse)

  linePositions.setXYZ(0, localPoint.x, localPoint.y, localPoint.z)
  linePositions.setXYZ(1, localLookAt.x, localLookAt.y, localLookAt.z)
  linePositions.needsUpdate = true
})

function updateDecalFromMouse() {
  const parent = currentParent.value
  if (!parent) { return }

  raycaster.value.setFromCamera(mouse, camera.activeCamera.value)
  const intersects = raycaster.value.intersectObject(parent, false)
  if (!intersects.length) { return }

  const { point, face } = intersects[0]
  if (!point || !face) { return }

  const worldNormal = face.normal.clone().transformDirection((parent as any).matrixWorld).normalize()
  const lookAtTarget = point.clone().add(worldNormal)

  dummyHelper.position.copy(point)
  dummyHelper.lookAt(lookAtTarget)
  baseOrientation.copy(dummyHelper.rotation)

  if (!editingDecal.value) {
    setIntersect(decalIntersect, intersects[0])
    if (boxHelperRef.value) { makeGeometry() }
    return
  }

  applyUserOrientation(decalOrientation)

  editingDecal.value.position.copy(point)
  editingDecal.value.orientation.copy(decalOrientation)
  editingDecal.value.size.copy(getScaledDecalSize(tmpVec3A))
  editingDecal.value.face = face
}

const onPointerDown = (e: PointerEvent) => {
  isDragging.value = false
  dragStart.set(e.clientX, e.clientY)
}

const onPointerUp = (e: PointerEvent) => {
  if (isHoveringDecal.value) { return }

  const dx = e.clientX - dragStart.x
  const dy = e.clientY - dragStart.y
  if (Math.sqrt(dx * dx + dy * dy) > 5) {
    isDragging.value = true
    return
  }

  if (!currentIntersectIsEmpty.value) { onClickDebug() }
}

watch(() => renderer.instance, () => {
  const instanceRenderer = renderer.instance
  if (!instanceRenderer?.domElement) { return }

  useEventListener(instanceRenderer.domElement, 'pointerdown', onPointerDown)
  useEventListener(instanceRenderer.domElement, 'pointerup', onPointerUp)
}, { immediate: true })

const stop = decalBus.on((payload: any) => {
  if (!debug.value) { return }

  switch (payload.type) {
    case 'drag-ui':
      mouse.set(payload.x, payload.y)
      updateDecalFromMouse()
      break

    case 'request-export': {
      const json = getLayoutJson()
      // eslint-disable-next-line no-console
      console.log('📦 Export JSON:', json)
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'design-layout.json'
      link.click()
      break
    }

    case 'drag-ui-orientation': {
      const decalAngle = -(payload.angle + Math.PI / 2)
      userOrientation.z = decalAngle
      decalOrientation.z = decalAngle

      if (editingDecal.value) {
        const newOrientation = new Euler().copy(baseOrientation)
        newOrientation.x += userOrientation.x
        newOrientation.y += userOrientation.y
        newOrientation.z += userOrientation.z
        editingDecal.value.orientation.copy(newOrientation)
      }
      else {
        makeGeometry()
      }
      break
    }

    case 'delete-decal':
      if (editingDecal.value) {
        stampedDecals.value = stampedDecals.value.filter(d => d.id !== editingDecal.value!.id)
      }
      resetEditingState()
      break

    case 'change-zindex': {
      const decal = stampedDecals.value.find(d => d.id === payload.id)
      if (decal) {
        decal.zIndex = Math.max(0, (decal.zIndex ?? 0) + payload.delta)
        if (editingDecal.value && editingDecal.value.id === decal.id) {
          editingDecal.value.zIndex = decal.zIndex
          makeGeometry()
        }
      }
      break
    }

    case 'cancel-edit':
      resetEditingState({ restoreBackup: true })
      break

    case 'drag-ui-scale':
      decalScale.value = payload.scale
      if (editingDecal.value) {
        editingDecal.value.size.copy(getScaledDecalSize(tmpVec3A))
      }
      else {
        makeGeometry()
      }
      break

    case 'validate-decal':
      validateDecal()
      currentTextureIndex.value = 0
      break

    case 'change-texture':
      if (textureList.value.length > 1) {
        let newIndex = currentTextureIndex.value + payload.direction
        if (newIndex < 0) { newIndex = textureList.value.length - 1 }
        if (newIndex >= textureList.value.length) { newIndex = 0 }
        currentTextureIndex.value = newIndex
      }
      break
  }
})

onBeforeUnmount(stop)

defineExpose({ root: meshRef })
</script>

<template>
  <TresMesh
    ref="meshRef"
    v-bind="$attrs"
    :visible="!editingDecal"
    :material-transparent="true"
    :material-polygonOffset="true"
    :material-polygonOffsetFactor="-50"
    :material-depthTest="depthTest"
    :material-map="activeMap"
    name="meshRef decal"
    :render-order="activeRenderOrder"
  >
    <TresMeshBasicMaterial />
  </TresMesh>

  <TresGroup v-if="currentParent" name="decal-items-group">
    <DecalItem
      v-for="(item) in stampedDecals"
      :key="item.id"
      :parent="(currentParent as Mesh)"
      :map="item.map"
      :highlight="true"
      :decal="item"
      :is-selected="editingDecal?.id === item.id"
      :debug="debug"
      @select="onSelectDecal"
      @hover="(val) => isHoveringDecal = val"
    >
      <slot></slot>
    </DecalItem>
  </TresGroup>

  <TresLine
    v-if="debug"
    ref="meshLineRef"
    :visible="!currentIntersectIsEmpty"
    name="decal-line-helper"
  >
    <TresBufferGeometry />
    <TresLineBasicMaterial color="blue" />
  </TresLine>

  <TresMesh
    v-if="!hideBoxHelper"
    ref="boxHelperRef"
    :visible="false"
    name="decal-box-helper"
  >
    <TresBoxGeometry :args="[0.1, 0.1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
