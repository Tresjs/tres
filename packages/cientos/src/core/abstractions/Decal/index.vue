<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, shallowReactive, shallowRef, type ShallowRef, toRefs, watch } from 'vue'
import type { Intersection, Texture } from 'three'
import { Euler, Group, Mesh, Object3D, Raycaster, Vector2, Vector3 } from 'three'
import { DecalGeometry } from 'three-stdlib'
import { useLoop, useTresContext } from '@tresjs/core'
import { useMouse } from '@vueuse/core'
import { decalBus } from './DecalBus'
import DecalItem from './DecalItem.vue'

export interface DecalJsonEntry {
  id: string
  position: [number, number, number]
  orientation: [number, number, number]
  size: [number, number, number]
  map: string
  zIndex: number
}

export interface DecalProps {
  debug?: boolean
  depthTest?: boolean
  map?: Texture | Texture[] | null
  mesh?: ShallowRef<Mesh | null>
  polygonOffsetFactor?: number
  position?: number[]
  orientation?: number[]
  size?: number[]
  normal?: number[]
  order?: number
  data?: DecalJsonEntry[]
}

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

const { debug, depthTest, mesh, map, polygonOffsetFactor, position, orientation, size, normal, data } = toRefs(props)

const { onBeforeRender } = useLoop()
const { sizes, camera, controls } = useTresContext()

const dragStart = new Vector2()
const isDragging = ref(false)
const dummyHelper = new Object3D()
const mouse = new Vector2()
const { x: xMouse, y: yMouse } = useMouse({ touch: false })
const raycaster = shallowRef(new Raycaster())
const meshRef = shallowRef<Mesh | null>(null)
const meshLineRef = shallowRef<Mesh | null>(null)
const boxHelperRef = shallowRef<ShallowRef<Mesh> | null>(null)

const decalPosition = reactive<Vector3>(new Vector3(...position.value))
const decalOrientation = reactive<Euler>(new Euler(...orientation.value))
const decalSize = reactive<Vector3>(new Vector3(...size.value))
const currentIntersect = shallowReactive<Intersection | {}>({})
const decalIntersect = shallowReactive<Intersection | {}>({})
const decalScale = ref(1)
const baseDecalSize = reactive(new Vector3(1, 1, 1))
const stampedDecals = ref<any[]>([])
const baseOrientation = reactive(new Euler())
const userOrientation = reactive(new Euler())
const editingDecal = ref<null | typeof stampedDecals.value[0]>(null)
const testRefsGroup = new Group()
const baseSize = ref(1)
const currentTextureIndex = ref(0)

const decalBackup = ref<{
  position: Vector3
  orientation: Euler
  size: Vector3
  zIndex: number
  map: Texture | null
} | null>(null)

const hideBoxHelper = ref(false)

const currentIntersectIsEmpty = computed(() => Object.keys(currentIntersect).length === 0)
const decalIntersectIsEmpty = computed(() => Object.keys(decalIntersect).length === 0)

const maxZIndex = computed(() =>
  Math.max(...stampedDecals.value.map(d => d.zIndex ?? 0), 0),
)

const currentParent = computed(() => {
  if (mesh.value) { return mesh.value }
  if (meshRef.value && meshRef.value.parent) { return meshRef.value.parent }
  return null
})

const textureList = computed(() => {
  if (!map.value) { return [] }
  const list = Array.isArray(map.value) ? map.value : [map.value]

  list.forEach((t) => {
    if (!t.name && t.image && t.image.src) {
      try {
        const src = t.image.src
        const filename = src.split('/').pop()?.split('?')[0]
        if (filename) {
          t.name = decodeURIComponent(filename)
        }
      }
      catch (e) {
        // silent
      }
    }
  })

  return list
})

const getTextureByPath = (pathName: string) => {
  if (textureList.value.length === 0) { return null }
  const found = textureList.value.find(t => t.name === pathName || (t.userData && t.userData.name === pathName))
  return found || textureList.value[0]
}

const getTextureNameForExport = (tex: Texture | null) => {
  if (!tex) { return 'unknown_texture' }
  if (tex.name) { return tex.name }
  if (tex.userData && tex.userData.name) { return tex.userData.name }
  if (tex.image && tex.image.src) {
    const filename = tex.image.src.split('/').pop()?.split('?')[0]
    if (filename) { return decodeURIComponent(filename) }
  }
  return 'unknown_texture'
}

const syncDataToScene = () => {
  if (!data.value || (textureList.value.length === 0 && data.value.length > 0)) { return }

  const newDecals: any[] = []

  data.value.forEach((entry) => {
    const position = new Vector3(...entry.position)
    const orientation = new Euler(...entry.orientation)
    const size = new Vector3(...entry.size)
    const textureMap = getTextureByPath(entry.map)

    newDecals.push({
      id: entry.id,
      position,
      orientation,
      size,
      zIndex: entry.zIndex,
      map: textureMap,
      object: meshRef.value,
      point: position,
    })
  })

  stampedDecals.value = newDecals
}

watch([() => data.value, textureList], () => {
  syncDataToScene()
}, { deep: true, immediate: true })

const getLayoutJson = () => {
  const exportData = stampedDecals.value.map(d => ({
    id: d.id,
    position: d.position.toArray(),
    orientation: d.orientation.toArray().slice(0, 3),
    size: d.size.toArray(),
    zIndex: d.zIndex,
    map: getTextureNameForExport(d.map),
  }))

  return { decals: exportData }
}

const activeMap = computed(() => {
  if (textureList.value.length === 0) { return null }
  return textureList.value[currentTextureIndex.value] || textureList.value[0]
})

const activeRenderOrder = computed(() => {
  if (editingDecal.value) { return editingDecal.value.zIndex ?? 0 }
  return 9999
})

watch(decalIntersectIsEmpty, (isEmpty) => {
  if (decalIntersectIsEmpty.value) { return }
  decalBus.emit({ type: 'ui-toggle-visibility-decal-intersect', visible: !isEmpty })
})

watch(currentIntersectIsEmpty, (isEmpty) => {
  if (!editingDecal.value) {
    decalBus.emit({ type: 'ui-toggle-visibility-current-intersect', visible: !isEmpty })
    return
  }
  if (decalIntersectIsEmpty.value) { return }
  decalBus.emit({ type: 'ui-toggle-visibility-current-intersect', visible: !isEmpty })
})

watch(textureList, (newList) => {
  if (currentTextureIndex.value >= newList.length) {
    currentTextureIndex.value = 0
  }
})

watch([xMouse, yMouse, sizes.width, sizes.height], () => {
  mouse.x = xMouse.value / sizes.width.value * 2 - 1
  mouse.y = -(yMouse.value / sizes.height.value) * 2 + 1
  decalBus.emit({ type: 'cursor-move', x: mouse.x, y: mouse.y })
}, { immediate: true })

watch(meshLineRef, () => {
  if (!meshLineRef.value) { return }
  meshLineRef.value.geometry.setFromPoints([new Vector3(), new Vector3()])
}, { immediate: true })

const makeGeometryInitial = () => {
  const parent = currentParent.value
  const target = meshRef.value
  if (!parent || !target) { return }

  target.geometry?.dispose()
  const parentMatrixWorld = parent.matrixWorld.clone().invert()

  target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize)
  target.geometry.applyMatrix4(parentMatrixWorld)
}

const makeGeometry = () => {
  const parent = currentParent.value
  const target = meshRef.value
  if (!parent || !target) { return }

  if (!editingDecal.value && (!decalIntersect.point || !decalIntersect.face)) { return }

  target.geometry?.dispose()

  parent.updateMatrixWorld(true)
  const parentMatrixWorld = parent.matrixWorld.clone()
  const parentMatrixWorldInverse = parentMatrixWorld.clone().invert()

  decalOrientation.copy(baseOrientation)
  decalOrientation.x += userOrientation.x
  decalOrientation.y += userOrientation.y
  decalOrientation.z += userOrientation.z

  const scaledSize = new Vector3(
    baseDecalSize.x * decalScale.value,
    baseDecalSize.y * decalScale.value,
    decalSize.z,
  )

  const originPoint = editingDecal.value ? editingDecal.value.position : decalIntersect.point
  if (!originPoint) { return }

  target.geometry = new DecalGeometry(parent, originPoint, decalOrientation, scaledSize)

  target.geometry.applyMatrix4(parentMatrixWorldInverse)

  const worldNormal = new Vector3(0, 0, 1).applyEuler(decalOrientation)

  const localNormal = worldNormal.transformDirection(parentMatrixWorldInverse).normalize()

  const baseOffset = 0.01
  const layerGap = 0.001
  let currentZ = 0

  if (editingDecal.value) {
    currentZ = editingDecal.value.zIndex ?? 0
  }
  else {
    currentZ = maxZIndex.value + 10
  }

  const totalOffset = baseOffset + (currentZ * layerGap)

  target.geometry.translate(
    localNormal.x * totalOffset,
    localNormal.y * totalOffset,
    localNormal.z * totalOffset,
  )
}

watch(editingDecal, (isEditing) => {
  hideBoxHelper.value = !!isEditing
  if (isEditing) {
    makeGeometryInitial()
    for (const key in decalIntersect) { delete decalIntersect[key] }
  }
}, { immediate: true })

watch(meshRef, (val) => {
  if (!val) { return }
  const parent = currentParent.value
  if (!(parent instanceof Mesh)) {
    throw new TypeError('A Mesh parent is required for the decal or the "mesh" prop must be set.')
  }
  makeGeometryInitial()
})

const updateAspectRatio = () => {
  const tex = activeMap.value
  if (!meshRef.value || !tex) { return }

  if (meshRef.value.material) {
    const mat = meshRef.value.material as any
    mat.map = tex
    mat.needsUpdate = true
  }

  const img = tex.image

  const applySize = (w: number, h: number) => {
    const diag = Math.sqrt(w * w + h * h)
    const normW = w / diag
    const normH = h / diag

    baseDecalSize.x = normW * baseSize.value
    baseDecalSize.y = normH * baseSize.value
    baseDecalSize.z = decalSize.z

    if (editingDecal.value) {
      editingDecal.value.map = tex
      editingDecal.value.size.set(
        baseDecalSize.x * decalScale.value,
        baseDecalSize.y * decalScale.value,
        decalSize.z,
      )
      makeGeometry()
    }
    else {
      makeGeometry()
    }
  }

  if (img && img.width && img.height) {
    applySize(img.width, img.height)
  }
  else {
    applySize(1, 1)
  }
}

watch(activeMap, updateAspectRatio, { immediate: true })

const onSelectDecal = (decal) => {
  if (editingDecal.value?.id === decal.id) { return }
  if (editingDecal.value) { decalBus.emit({ type: 'cancel-edit' }) }

  if (decal.map && textureList.value.length > 1) {
    const foundIndex = textureList.value.findIndex(t => t.uuid === decal.map?.uuid)
    if (foundIndex !== -1) { currentTextureIndex.value = foundIndex }
  }

  if (decal.map && decal.map.image) {
    const { width, height } = decal.map.image
    const diag = Math.sqrt(width * width + height * height)
    const normW = width / diag
    const normH = height / diag
    baseDecalSize.x = normW * baseSize.value
    baseDecalSize.y = normH * baseSize.value
    baseDecalSize.z = decalSize.z
  }

  decalBackup.value = { ...decal }

  decal.zIndex = maxZIndex.value + 1
  editingDecal.value = decal

  for (const key in decalIntersect) { delete decalIntersect[key] }
  const currentScaleValue = decal.size.x / baseDecalSize.x
  decalScale.value = currentScaleValue

  raycaster.value.setFromCamera(mouse, camera.activeCamera.value)

  const intersects = raycaster.value.intersectObject(currentParent.value, false)

  if (intersects.length > 0) {
    const { point, face } = intersects[0]

    const n = face.normal.clone().transformDirection(currentParent.value.matrixWorld)
    const lookAtTarget = point.clone().add(n)

    dummyHelper.position.copy(point)
    dummyHelper.lookAt(lookAtTarget)

    baseOrientation.copy(dummyHelper.rotation)
  }
  else {
    baseOrientation.copy(decal.orientation)
  }

  const angleZ = decal.orientation.z - baseOrientation.z

  userOrientation.set(
    0,
    0,
    angleZ,
  )

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
    id: decal.id,
    textureCount: textureList.value.length,
  })

  makeGeometry()
}

const onClickDebug = async () => {
  if (currentIntersectIsEmpty.value) { return }

  decalBus.emit({ type: 'click', textureCount: textureList.value.length })

  await nextTick()
  makeGeometry()
}

const validateDecal = async () => {
  if (!meshRef.value) { return }
  const parent = currentParent.value
  if (!(parent instanceof Mesh)) { return }

  if (!editingDecal.value && decalIntersectIsEmpty.value) { return }

  if (editingDecal.value) {
    const index = stampedDecals.value.findIndex(d => d.id === editingDecal.value.id)
    if (index !== -1) {
      stampedDecals.value[index].position.copy(editingDecal.value.position)
      stampedDecals.value[index].orientation.copy(editingDecal.value.orientation)
      stampedDecals.value[index].size.copy(editingDecal.value.size)
      stampedDecals.value[index].map = activeMap.value
    }
  }
  else {
    if (decalIntersect.point) {
      const newId = crypto.randomUUID()
      const position = decalIntersect.point.clone()
      const orientation = decalOrientation.clone()
      const size = new Vector3(
        baseDecalSize.x * decalScale.value,
        baseDecalSize.y * decalScale.value,
        decalSize.z,
      )
      const nextZIndex = maxZIndex.value + 1

      stampedDecals.value.push({
        ...(decalIntersect as any),
        position,
        orientation,
        size,
        id: newId,
        zIndex: nextZIndex,
        map: activeMap.value,
      })
    }
  }

  editingDecal.value = null
  userOrientation.set(0, 0, 0)
  decalScale.value = 1
  for (const key in decalIntersect) { delete decalIntersect[key] }
  makeGeometryInitial()
}

onBeforeRender(() => {
  if (!meshLineRef.value || !meshRef.value || !debug.value) { return }
  const parent = currentParent.value
  if (!parent) { return }

  raycaster.value.setFromCamera(mouse, camera.activeCamera.value)
  const moreGroup = testRefsGroup.children || []
  const intersects = raycaster.value.intersectObjects([parent, ...moreGroup], false)

  if (intersects.length > 0) {
    const { object } = intersects[0]
    if (object.uuid !== parent.uuid && decalIntersectIsEmpty.value) {
      hideBoxHelper.value = true
    }
    else {
      if (editingDecal.value) { return }
      hideBoxHelper.value = false
      if (!boxHelperRef.value || !meshRef.value) { return }
      const { point, face } = intersects[0]
      if (!face || !point) { return }
      Object.assign(currentIntersect, intersects[0])

      const { depth } = boxHelperRef.value.geometry.parameters
      const parentMatrixWorld = parent.matrixWorld.clone().invert()
      const p = point.clone().applyMatrix4(parentMatrixWorld)
      boxHelperRef.value.position.copy(p)

      const nLookAt = face.normal.clone().transformDirection(parent.matrixWorld).multiplyScalar(depth).add(point)
      boxHelperRef.value.lookAt(nLookAt)

      const nLineHelper = face.normal.clone().transformDirection(parent.matrixWorld).multiplyScalar(depth).add(point).applyMatrix4(parentMatrixWorld)
      const positions = meshLineRef.value.geometry.attributes.position
      positions.setXYZ(0, p.x, p.y, p.z)
      positions.setXYZ(1, nLineHelper.x, nLineHelper.y, nLineHelper.z)
      positions.needsUpdate = true
    }
  }
  else {
    for (const key in currentIntersect) { delete currentIntersect[key] }
  }
})

function updateDecalFromMouse() {
  const parent = currentParent.value
  if (!parent) { return }
  raycaster.value.setFromCamera(mouse, camera.activeCamera.value)
  const intersects = raycaster.value.intersectObject(parent, false)
  if (!intersects.length) { return }

  const { point, face } = intersects[0]
  if (!point || !face) { return }

  if (!editingDecal.value) {
    Object.assign(decalIntersect, intersects[0])
    if (!boxHelperRef.value) { return }
    baseOrientation.copy(boxHelperRef.value.rotation)
    makeGeometry()
  }
  else {
    const pointWorld = point.clone()
    const n = face.normal.clone().transformDirection(parent.matrixWorld)
    const lookAtTarget = pointWorld.clone().add(n)

    dummyHelper.position.copy(pointWorld)
    dummyHelper.lookAt(lookAtTarget)
    baseOrientation.copy(dummyHelper.rotation)

    decalOrientation.copy(baseOrientation)
    decalOrientation.x += userOrientation.x
    decalOrientation.y += userOrientation.y
    decalOrientation.z += userOrientation.z

    const scaledSize = new Vector3(
      baseDecalSize.x * decalScale.value,
      baseDecalSize.y * decalScale.value,
      decalSize.z,
    )

    editingDecal.value.position.copy(pointWorld)
    editingDecal.value.orientation.copy(decalOrientation)
    editingDecal.value.size.copy(scaledSize)
    editingDecal.value.face = face
  }
}

const onPointerDown = (e: PointerEvent) => {
  e.stopPropagation()
  dragStart.set(e.clientX, e.clientY)
  isDragging.value = false
}

const onPointerUp = async (e: PointerEvent) => {
  e.stopPropagation()
  const dx = e.clientX - dragStart.x
  const dy = e.clientY - dragStart.y
  if (Math.sqrt(dx * dx + dy * dy) > 1) {
    isDragging.value = true
    return
  }
  onClickDebug()
}

const stop = decalBus.on((payload) => {
  if (payload.type === 'drag-ui') {
    mouse.x = payload.x
    mouse.y = payload.y
    updateDecalFromMouse()
  }

  if (payload.type === 'request-export') {
    const json = getLayoutJson()
    console.log('📦 Export JSON:', json)

    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'design-layout.json'
    link.click()
  }

  if (payload.type === 'drag-ui-orientation') {
    const decalAngle = -(payload.angle + Math.PI / 2)
    userOrientation.z = decalAngle
    decalOrientation.z = decalAngle

    if (editingDecal.value) {
      const newOrientation = baseOrientation.clone()
      newOrientation.x += userOrientation.x
      newOrientation.y += userOrientation.y
      newOrientation.z += userOrientation.z
      editingDecal.value.orientation.copy(newOrientation)
    }
    else {
      makeGeometry()
    }
  }

  if (payload.type === 'delete-decal') {
    if (!editingDecal.value) { return }

    if (editingDecal.value) {
      stampedDecals.value = stampedDecals.value.filter(d => d.id !== editingDecal.value?.id)
      editingDecal.value = null
      decalBackup.value = null
    }

    for (const key in currentIntersect) { delete currentIntersect[key] }
    for (const key in decalIntersect) { delete decalIntersect[key] }
    hideBoxHelper.value = false
    decalBus.emit({ type: 'ui-toggle-visibility-decal-intersect', visible: false })
    makeGeometryInitial()
    decalBus.emit({ type: 'refresh-raycasts' })
  }

  if (payload.type === 'change-zindex') {
    const decal = stampedDecals.value.find(d => d.id === payload.id)
    if (decal) {
      decal.zIndex = Math.max(0, (decal.zIndex ?? 0) + payload.delta)
      if (editingDecal.value && editingDecal.value.id === decal.id) {
        editingDecal.value.zIndex = decal.zIndex
        makeGeometry()
      }
    }
  }

  if (payload.type === 'cancel-edit') {
    if (!editingDecal.value) { return }

    if (decalBackup.value) {
      editingDecal.value.position.copy(decalBackup.value.position)
      editingDecal.value.orientation.copy(decalBackup.value.orientation)
      editingDecal.value.size.copy(decalBackup.value.size)
      editingDecal.value.zIndex = decalBackup.value.zIndex
      editingDecal.value.map = decalBackup.value.map
      decalBackup.value = null
    }
    editingDecal.value = null

    for (const key in currentIntersect) { delete currentIntersect[key] }
    for (const key in decalIntersect) { delete decalIntersect[key] }

    hideBoxHelper.value = false
    decalBus.emit({ type: 'ui-toggle-visibility-decal-intersect', visible: false })
    makeGeometryInitial()
    decalBus.emit({ type: 'refresh-raycasts' })
  }

  if (payload.type === 'drag-ui-scale') {
    decalScale.value = payload.scale
    if (editingDecal.value) {
      editingDecal.value.size.set(
        baseDecalSize.x * decalScale.value,
        baseDecalSize.y * decalScale.value,
        decalSize.z,
      )
    }
    else {
      makeGeometry()
    }
  }

  if (payload.type === 'validate-decal') {
    validateDecal()
  }

  if (payload.type === 'change-texture') {
    if (textureList.value.length <= 1) { return }
    let newIndex = currentTextureIndex.value + payload.direction
    if (newIndex < 0) { newIndex = textureList.value.length - 1 }
    if (newIndex >= textureList.value.length) { newIndex = 0 }
    currentTextureIndex.value = newIndex
  }
})

onBeforeUnmount(() => {
  stop()
})

defineExpose({ root: meshRef })
</script>

<template>
  <TresMesh
    ref="meshRef"
    v-bind="$attrs"
    :visible="!editingDecal"
    :material-transparent="true"
    material-polygonOffset
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
      v-for="(item, index) in stampedDecals"
      :key="item.id"
      :parent="currentParent"
      :map="item.map"
      :group-test="testRefsGroup"
      :highlight="true"
      :decal="item"
      :is-selected="editingDecal?.id === item.id"
      @select="onSelectDecal"
    >
      <slot></slot>
    </DecalItem>
  </TresGroup>

  <TresLine v-if="debug" ref="meshLineRef" :visible="!!(!currentIntersectIsEmpty)" name="decal-line-helper">
    <TresBufferGeometry />
    <TresLineBasicMaterial color="blue" />
  </TresLine>

  <TresMesh
    v-if="!hideBoxHelper"
    ref="boxHelperRef"
    :visible="false"
    name="decal-box-helper"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
  >
    <TresBoxGeometry :args="[0.1, 0.1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
