<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, shallowReactive, shallowRef, toRefs, watch } from 'vue'
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
const decalScale = ref(1)

const baseOrientation = reactive(new Euler())
const userOrientation = reactive(new Euler())

const baseSize = ref(1)

const currentIntersect = shallowReactive<Intersection | {}>({})
const decalIntersect = shallowReactive<Intersection | {} & { point?: Vector3, face?: any }>({})
const testRefsGroup = new Group()

const currentTextureIndex = ref(0)
const isHoveringDecal = ref(false)
const hideBoxHelper = ref(false)

const currentParent = computed(() => {
  if (mesh.value) { return mesh.value }
  if (meshRef.value && meshRef.value.parent) { return meshRef.value.parent }
  return null
})

const currentIntersectIsEmpty = computed(() => Object.keys(currentIntersect).length === 0)
const decalIntersectIsEmpty = computed(() => Object.keys(decalIntersect).length === 0)
const maxZIndex = computed(() => Math.max(...stampedDecals.value.map(d => d.zIndex ?? 0), 0))

const textureList = computed(() => {
  if (!map.value) { return [] }
  const list = Array.isArray(map.value) ? map.value : [map.value]

  list.forEach((t) => {
    if (!t.name && t.image && t.image.src) {
      try {
        const src = t.image.src
        const filename = src.split('/').pop()?.split('?')[0]
        if (filename) { t.name = decodeURIComponent(filename) }
      }
      catch (e) { /* silent */ }
    }
  })
  return list
})

const activeMap = computed(() => textureList.value[currentTextureIndex.value] || textureList.value[0])

const activeRenderOrder = computed(() => editingDecal.value ? (editingDecal.value.zIndex ?? 0) : 9999)

const getTextureByPath = (pathName: string) => {
  if (textureList.value.length === 0) { return null }
  const found = textureList.value.find(t => t.name === pathName || (t.userData && t.userData.name === pathName))
  return found || textureList.value[0]
}

const syncDataToScene = () => {
  if (!data.value || (textureList.value.length === 0 && data.value.length > 0)) { return }

  stampedDecals.value = data.value.map((entry) => {
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
    }
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
  if (decalIntersectIsEmpty.value) { return }
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

watch(textureList, (newList) => {
  if (currentTextureIndex.value >= newList.length) {
    currentTextureIndex.value = 0
  }
})

watch([xMouse, yMouse, sizes.width, sizes.height], () => {
  if (!debug.value) { return }
  mouse.x = xMouse.value / sizes.width.value * 2 - 1
  mouse.y = -(yMouse.value / sizes.height.value) * 2 + 1
  decalBus.emit({ type: 'cursor-move', x: mouse.x, y: mouse.y })
}, { immediate: true })

watch(meshLineRef, () => {
  if (!meshLineRef.value) { return }
  meshLineRef.value.geometry.setFromPoints([new Vector3(), new Vector3()])
}, { immediate: true })

const makeGeometryInitial = () => {
  if (!currentParent.value || !meshRef.value) { return }

  const tempDecalData: DecalData = {
    position: decalPosition,
    orientation: decalOrientation,
    size: decalSize,
    zIndex: 0,
  }
  updateDecalGeometry(meshRef.value, currentParent.value, tempDecalData)
}

const makeGeometry = () => {
  const parent = currentParent.value
  const target = meshRef.value
  if (!parent || !target) { return }

  if (!editingDecal.value && (!decalIntersect.point || !decalIntersect.face)) { return }

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

  let currentZ = maxZIndex.value + 10
  if (editingDecal.value) {
    currentZ = editingDecal.value.zIndex ?? 0
  }

  const decalData: DecalData = {
    position: originPoint,
    orientation: decalOrientation,
    size: scaledSize,
    zIndex: currentZ,
  }

  updateDecalGeometry(target, parent, decalData)
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
  if (!(currentParent.value instanceof Mesh)) {
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

  if (tex.image && tex.image.width && tex.image.height) {
    applySize(tex.image.width, tex.image.height)
  }
  else {
    applySize(1, 1)
  }
}

watch(activeMap, updateAspectRatio, { immediate: true })

const onSelectDecal = (decal: DecalData) => {
  if (editingDecal.value?.id === decal.id) { return }
  if (editingDecal.value) { decalBus.emit({ type: 'cancel-edit' }) }

  if (decal.map && textureList.value.length > 1) {
    const foundIndex = textureList.value.findIndex(t => t.uuid === decal.map?.uuid)
    if (foundIndex !== -1) { currentTextureIndex.value = foundIndex }
  }

  if (decal.map && decal.map.image) {
    const { width, height } = decal.map.image
    const diag = Math.sqrt(width * width + height * height)
    baseDecalSize.x = (width / diag) * baseSize.value
    baseDecalSize.y = (height / diag) * baseSize.value
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
    const n = face!.normal.clone().transformDirection(currentParent.value.matrixWorld)
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
  makeGeometry()
}

const validateDecal = async () => {
  if (!meshRef.value || !(currentParent.value instanceof Mesh)) { return }
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
  else if (decalIntersect.point) {
    const newId = crypto.randomUUID()
    stampedDecals.value.push({
      ...(decalIntersect as any),
      position: decalIntersect.point.clone(),
      orientation: decalOrientation.clone(),
      size: new Vector3(
        baseDecalSize.x * decalScale.value,
        baseDecalSize.y * decalScale.value,
        decalSize.z,
      ),
      id: newId,
      zIndex: maxZIndex.value + 1,
      map: activeMap.value,
    })
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

      const worldNormal = face.normal.clone().transformDirection(parent.matrixWorld).normalize()
      const { depth } = boxHelperRef.value.geometry.parameters
      const lookAtTarget = point.clone().add(worldNormal.clone().multiplyScalar(depth))

      const helperParent = boxHelperRef.value.parent
      const helperParentInverse = helperParent ? helperParent.matrixWorld.clone().invert() : new Matrix4()
      const localPoint = point.clone().applyMatrix4(helperParentInverse)

      boxHelperRef.value.position.copy(localPoint)
      boxHelperRef.value.lookAt(lookAtTarget)

      const linePositions = meshLineRef.value.geometry.attributes.position
      const localLookAt = lookAtTarget.clone().applyMatrix4(helperParentInverse)

      linePositions.setXYZ(0, localPoint.x, localPoint.y, localPoint.z)
      linePositions.setXYZ(1, localLookAt.x, localLookAt.y, localLookAt.z)
      linePositions.needsUpdate = true
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

  const worldNormal = face.normal.clone().transformDirection(parent.matrixWorld).normalize()
  const lookAtTarget = point.clone().add(worldNormal)

  dummyHelper.position.copy(point)
  dummyHelper.lookAt(lookAtTarget)
  baseOrientation.copy(dummyHelper.rotation)

  if (!editingDecal.value) {
    Object.assign(decalIntersect, intersects[0])
    if (boxHelperRef.value) { makeGeometry() }
  }
  else {
    decalOrientation.copy(baseOrientation)
    decalOrientation.x += userOrientation.x
    decalOrientation.y += userOrientation.y
    decalOrientation.z += userOrientation.z

    const scaledSize = new Vector3(
      baseDecalSize.x * decalScale.value,
      baseDecalSize.y * decalScale.value,
      decalSize.z,
    )

    editingDecal.value.position.copy(point)
    editingDecal.value.orientation.copy(decalOrientation)
    editingDecal.value.size.copy(scaledSize)
    editingDecal.value.face = face
  }
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
  if (!currentIntersectIsEmpty.value) {
    onClickDebug()
  }
}

watch(() => renderer.instance, () => {
  const instanceRenderer = renderer.instance
  if (instanceRenderer?.domElement) {
    useEventListener(instanceRenderer.domElement, 'pointerdown', onPointerDown)
    useEventListener(instanceRenderer.domElement, 'pointerup', onPointerUp)
  }
}, { immediate: true })

const stop = decalBus.on((payload) => {
  if (!debug.value) { return }

  switch (payload.type) {
    case 'drag-ui':
      mouse.x = payload.x
      mouse.y = payload.y
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
        const newOrientation = baseOrientation.clone()
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
      if (editingDecal.value && decalBackup.value) {
        Object.assign(editingDecal.value, decalBackup.value)
        decalBackup.value = null
      }
      editingDecal.value = null
      for (const key in currentIntersect) { delete currentIntersect[key] }
      for (const key in decalIntersect) { delete decalIntersect[key] }
      hideBoxHelper.value = false
      decalBus.emit({ type: 'ui-toggle-visibility-decal-intersect', visible: false })
      makeGeometryInitial()
      decalBus.emit({ type: 'refresh-raycasts' })
      break
    case 'drag-ui-scale':
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
      :group-test="testRefsGroup"
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

  <TresLine v-if="debug" ref="meshLineRef" :visible="!!(!currentIntersectIsEmpty)" name="decal-line-helper">
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
