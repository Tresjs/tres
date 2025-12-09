<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, shallowReactive, shallowRef, type ShallowRef, toRefs, useTemplateRef, watch } from 'vue'
import type { Intersection, Texture } from 'three'
import { BufferGeometry, Euler, Group, MathUtils, Mesh, Object3D, Raycaster, Vector2, Vector3 } from 'three'
import { DecalGeometry } from 'three-stdlib'
import { useLoop, useTresContext } from '@tresjs/core'
import { useMouse } from '@vueuse/core'
import { decalBus } from './DecalBus'
import DecalItem from './DecalItem.vue'

export interface DecalProps {
  debug?: boolean
  depthTest?: boolean
  map?: Texture | null
  mesh?: ShallowRef<Mesh | null>
  polygonOffsetFactor?: number
  position?: number[]
  orientation?: number[]
  size?: number[]
  normal?: number[]
  order?: number
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
})

const { debug, depthTest, mesh, map, polygonOffsetFactor, position, orientation, size, normal } = toRefs(props)

const { onBeforeRender } = useLoop()

const { sizes, camera, controls } = useTresContext()

const decalPosition = reactive<Vector3>(new Vector3(...position.value))
const decalOrientation = reactive<Euler>(new Euler(...orientation.value))
const decalSize = reactive<Vector3>(new Vector3(...size.value))
const currentIntersect = shallowReactive<Intersection | {}>({})
const decalIntersect = shallowReactive<Intersection | {}>({})
const decalScale = ref(1)
const baseDecalSize = reactive(new Vector3(1, 1, 1))
const stampedDecals = ref<
  Array<Intersection & { position: Vector3, orientation: Euler, size: Vector3, id: string }>
>([])
const baseOrientation = reactive(new Euler())
const userOrientation = reactive(new Euler())
const editingDecal = ref<null | typeof stampedDecals.value[0]>(null)
const testRefsGroup = new Group()
const baseSize = ref(1) // Échelle cohérente commune

const decalBackup = ref<{
  position: Vector3
  orientation: Euler
  size: Vector3
  zIndex: number
} | null>(null)

const hideBoooooox = ref(false)

const currentIntersectIsEmpty = computed(() => Object.keys(currentIntersect).length === 0)
const decalIntersectIsEmpty = computed(() => Object.keys(decalIntersect).length === 0)

const dragStart = new Vector2()
const isDragging = ref(false)
const dummyHelper = new Object3D()
const mouse = new Vector2()

const { x: xMouse, y: yMouse } = useMouse({ touch: false })

const raycaster = shallowRef(new Raycaster())

const meshRef = shallowRef<Mesh | null>(null)
const meshLineRef = shallowRef<Mesh | null>(null)
const boxHelperRef = shallowRef<ShallowRef<Mesh> | null>(null)

watch(decalIntersectIsEmpty, (isEmpty) => {
  if (decalIntersectIsEmpty.value) { return }

  decalBus.emit({
    type: 'ui-toggle-visibility-decal-intersect',
    visible: !isEmpty,
  })
})

watch(currentIntersectIsEmpty, (isEmpty) => {
  // Si on n'est PAS en édition, on doit permettre le hover
  if (!editingDecal.value) {
    decalBus.emit({
      type: 'ui-toggle-visibility-current-intersect',
      visible: !isEmpty,
    })
    return
  }

  // En mode édition on garde ton ancien comportement
  if (decalIntersectIsEmpty.value) { return }

  decalBus.emit({
    type: 'ui-toggle-visibility-current-intersect',
    visible: !isEmpty,
  })
})

watch([xMouse, yMouse, sizes.width, sizes.height], () => {
  mouse.x = xMouse.value / sizes.width.value * 2 - 1
  mouse.y = -(yMouse.value / sizes.height.value) * 2 + 1

  decalBus.emit({
    type: 'cursor-move',
    x: mouse.x,
    y: mouse.y,
  })
}, { immediate: true })

const makeGeometryInitial = () => {
  const parent = mesh?.value || meshRef.value?.parent
  const target = meshRef.value

  if (!parent || !target) { return }

  target.geometry?.dispose()

  const parentMatrixWorld = parent.matrixWorld.clone().invert()
  target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize)
  target.geometry.applyMatrix4(parentMatrixWorld)
}

const maxZIndex = computed(() =>
  Math.max(...stampedDecals.value.map(d => d.zIndex ?? 0), 0),
)

watch(editingDecal, (isEditing) => {
  hideBoooooox.value = !!isEditing

  if (isEditing) {
    makeGeometryInitial()

    for (const key in decalIntersect) { delete decalIntersect[key] }
  }
}, { immediate: true })

watch(meshLineRef, () => {
  if (!meshLineRef.value) { return }

  meshLineRef.value.geometry.setFromPoints([new Vector3(), new Vector3()])
}, { immediate: true })

watch(meshRef, (val) => {
  if (!val) { return }

  const parent = mesh?.value || meshRef.value?.parent
  if (!(parent instanceof Mesh)) {
    throw new TypeError('A Mesh parent is required for the decal or the "mesh" prop must be set.')
  }

  makeGeometryInitial()
})

watch(map, (newMap) => {
  if (!meshRef.value || !newMap) { return }

  const img = newMap.image
  if (!img?.width || !img?.height) { return }

  const w = img.width
  const h = img.height

  const diag = Math.sqrt(w * w + h * h)
  const normW = w / diag
  const normH = h / diag

  baseDecalSize.x = normW * baseSize.value
  baseDecalSize.y = normH * baseSize.value
  baseDecalSize.z = decalSize.z

  makeGeometryInitial()
}, { immediate: true })

onBeforeRender(({ delta, elapsed, clock }) => {
  if (!meshLineRef.value || !meshRef.value || !debug.value) { return }

  const parent = mesh?.value || meshRef.value.parent

  if (!parent) { return }

  raycaster.value.setFromCamera(mouse, camera.activeCamera.value)

  const moreGroup = testRefsGroup.children || []
  const intersects = raycaster.value.intersectObjects([parent, ...moreGroup], false)

  if (intersects.length > 0) {
    const { object } = intersects[0]

    if (object.uuid !== parent.uuid) {
      hideBoooooox.value = true
    }
    else {
      if (editingDecal.value) { return }

      hideBoooooox.value = false

      if (!boxHelperRef.value || !meshRef.value) { return }

      const { point, face } = intersects[0]
      if (!face || !point) { return }

      Object.assign(currentIntersect, intersects[0])

      const { depth } = boxHelperRef.value.geometry.parameters

      const parentMatrixWorld = parent.matrixWorld.clone().invert()
      const p = point.clone().applyMatrix4(parentMatrixWorld)

      boxHelperRef.value.position.copy(p)

      const nLookAt = face.normal.clone()
      nLookAt.transformDirection(parent.matrixWorld)
      nLookAt.multiplyScalar(depth)
      nLookAt.add(point)

      const nLineHelper = face.normal.clone()
      nLineHelper.transformDirection(parent.matrixWorld)
      nLineHelper.multiplyScalar(depth)
      nLineHelper.add(point)
      nLineHelper.applyMatrix4(parentMatrixWorld)

      boxHelperRef.value.lookAt(nLookAt)

      const positions = meshLineRef.value.geometry.attributes.position
      positions.setXYZ(0, p.x, p.y, p.z)
      positions.setXYZ(1, nLineHelper.x, nLineHelper.y, nLineHelper.z)
      positions.needsUpdate = true
    }
  }
  else {
    for (const key in currentIntersect) {
      if (Object.hasOwnProperty.call(currentIntersect, key)) {
        delete currentIntersect[key]
      }
    }
  }
})

const activeRenderOrder = computed(() => {
  if (editingDecal.value) {
    // Si on édite, on garde sa place réelle dans la pile
    return editingDecal.value.zIndex ?? 0
  }
  // Si on crée (preview), on force l'affichage en TOUT DERNIER (par dessus tout)
  return 9999
})

const activePolygonOffset = computed(() => {
  if (editingDecal.value) {
    // En édition : offset standard pour éviter le z-fighting entre decals proches
    return -10 - (editingDecal.value.zIndex ?? 0)
  }
  // En création : offset EXTRÊME pour toujours gagner
  return -100
})

const makeGeometry = () => {
  const parent = mesh?.value || meshRef.value?.parent
  const target = meshRef.value

  if (!parent || !target) { return }

  if (editingDecal.value) { return }

  if (!decalIntersect.point || !decalIntersect.face) { return }

  target.geometry?.dispose()

  console.log('Making decal geometry...')
  parent.updateMatrixWorld()
  const parentMatrixWorld = parent.matrixWorld.clone().invert()

  decalOrientation.copy(baseOrientation)
  decalOrientation.x += userOrientation.x
  decalOrientation.y += userOrientation.y
  decalOrientation.z += userOrientation.z

  const scaledSize = new Vector3(
    baseDecalSize.x * decalScale.value,
    baseDecalSize.y * decalScale.value,
    decalSize.z,
  )

  target.geometry = new DecalGeometry(parent, decalIntersect.point, decalOrientation, scaledSize)
  target.geometry.applyMatrix4(parentMatrixWorld)

  // --- CORRECTION ICI ---
  const faceNormalWorld = decalIntersect.face.normal.clone()
  faceNormalWorld.transformDirection(parent.matrixWorld)

  // On se place physiquement au-dessus du decal le plus haut existant
  const baseOffset = 0.01
  const layerGap = 0.001

  let currentZ = 0

  if (editingDecal.value) {
    // Si on édite, on prend sa position stricte
    currentZ = editingDecal.value.zIndex ?? 0
  }
  else {
    // Si c'est le curseur (preview), on se met LARGEMENT au-dessus du max
    // On ajoute +10 couches virtuelles pour être sûr qu'il ne clippe pas
    currentZ = maxZIndex.value + 10
  }

  const totalOffset = baseOffset + (currentZ * layerGap)

  const offsetVector = faceNormalWorld.applyMatrix4(parentMatrixWorld).normalize().multiplyScalar(totalOffset)

  target.geometry.translate(offsetVector.x, offsetVector.y, offsetVector.z)
}

const onSelectDecal = (decal) => {
// 1. PROTECTION : Si on clique sur le même decal, on arrête tout.
  // Cela empêche d'écraser le backup "propre" avec la position modifiée.
  if (editingDecal.value?.id === decal.id) {
    return
  }

  // 2. Si on était en train d'éditer un AUTRE decal, on annule d'abord ses modifs
  if (editingDecal.value) {
    decalBus.emit({ type: 'cancel-edit' })
    // Le cancel est synchrone, editingDecal est maintenant null
  }

  // 3. On sauvegarde l'état initial (le backup propre)
  decalBackup.value = {
    position: decal.position.clone(),
    orientation: decal.orientation.clone(),
    size: decal.size.clone(),
    zIndex: decal.zIndex ?? 0,
  }

  // 4. On passe le decal au premier plan pour l'édition
  decal.zIndex = maxZIndex.value + 1

  editingDecal.value = decal

  for (const key in decalIntersect) { delete decalIntersect[key] }

  const currentScaleValue = decal.size.x / baseDecalSize.x
  decalScale.value = currentScaleValue

  const angleZ = decal.orientation.z - baseOrientation.z

  userOrientation.set(
    decal.orientation.x - baseOrientation.x,
    decal.orientation.y - baseOrientation.y,
    angleZ,
  )

  const uiAngle = -angleZ - Math.PI / 2

  const screenPosition = decal.position.clone()

  screenPosition.project(camera.activeCamera.value)

  const x = (screenPosition.x * 0.5 + 0.5) * sizes.width.value
  const y = -(screenPosition.y * 0.5 - 0.5) * sizes.height.value

  decalBus.emit({
    type: 'ui-toggle-visibility-decal-intersect',
    visible: true,
  })

  decalBus.emit({
    type: 'set-ui-state',
    scale: currentScaleValue,
    angle: uiAngle,
    x,
    y,
    id: decal.id, // ← IMPORTANT
  })
}

const onClickDebug = async () => {
  if (currentIntersectIsEmpty.value) { return }

  decalBus.emit({
    type: 'click',
  })

  await nextTick()

  makeGeometry()
}

const onPointerDown = (e: PointerEvent) => {
  e.stopPropagation()
  dragStart.set(e.clientX, e.clientY)
  isDragging.value = false
}

function updateDecalFromMouse() {
  const parent = mesh?.value || meshRef.value?.parent
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

    const n = face.normal.clone()
    n.transformDirection(parent.matrixWorld)

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

const onPointerUp = async (e: PointerEvent) => {
  e.stopPropagation()
  const dx = e.clientX - dragStart.x
  const dy = e.clientY - dragStart.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance > 1) {
    isDragging.value = true
    return
  }

  onClickDebug()
}

const validateDecal = async () => {
  if (!meshRef.value) { return }

  const parent = mesh?.value || meshRef.value?.parent
  if (!(parent instanceof Mesh)) { return }

  if (!editingDecal.value && decalIntersectIsEmpty.value) { return }

  if (editingDecal.value) {
    const index = stampedDecals.value.findIndex(d => d.id === editingDecal.value.id)
    if (index !== -1) {
      stampedDecals.value[index].position.copy(editingDecal.value.position)
      stampedDecals.value[index].orientation.copy(editingDecal.value.orientation)
      stampedDecals.value[index].size.copy(editingDecal.value.size)
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
        zIndex: nextZIndex, // 👈 On applique direct le bon ordre
      })
    }
  }

  editingDecal.value = null
  userOrientation.set(0, 0, 0)
  decalScale.value = 1

  for (const key in decalIntersect) { delete decalIntersect[key] }

  makeGeometryInitial()
}

const stop = decalBus.on((payload) => {
  if (payload.type === 'drag-ui') {
    mouse.x = payload.x
    mouse.y = payload.y
    updateDecalFromMouse()
  }

  if (payload.type === 'drag-ui-orientation') {
    const angle = payload.angle

    let decalAngle = angle + Math.PI / 2
    decalAngle = -decalAngle

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
    // CAS 1 : C'est un decal existant (Mode Édition)
    if (editingDecal.value) {
      // On le supprime de la liste principale
      stampedDecals.value = stampedDecals.value.filter(d => d.id !== editingDecal.value?.id)

      // On nettoie les références d'édition pour éviter que le 'cancel' ne tente de restaurer un backup
      editingDecal.value = null
      decalBackup.value = null
    }

    // CAS 2 : C'est un nouveau decal (Mode Création - "Pas ajouté")
    // On ne fait rien dans le `if` ci-dessus, donc on passe directement à la suite.

    // ÉTAPE COMMUNE (Comportement "Cancel") : Nettoyage de l'UI
    // On exécute le même nettoyage que pour 'cancel-edit'
    for (const key in currentIntersect) { delete currentIntersect[key] }
    for (const key in decalIntersect) { delete decalIntersect[key] }

    hideBoooooox.value = false

    decalBus.emit({
      type: 'ui-toggle-visibility-decal-intersect',
      visible: false,
    })

    // Remet le curseur en mode "preview" standard
    makeGeometryInitial()

    // Rafraichit les raycasts pour que tout soit propre
    decalBus.emit({ type: 'refresh-raycasts' })
  }
  // Decal.vue - dans decalBus.on

  if (payload.type === 'change-zindex') {
    const decal = stampedDecals.value.find(d => d.id === payload.id)

    if (decal) {
      decal.zIndex = Math.max(0, (decal.zIndex ?? 0) + payload.delta)

      // 💥 Correction nécessaire : MAJ immédiate du mesh en édition
      if (editingDecal.value && editingDecal.value.id === decal.id) {
        console.log('Updating geometry after zIndex change...')
        editingDecal.value.zIndex = decal.zIndex
        makeGeometry() // <-- ajoute cette ligne
      }
    }
  }

  if (payload.type === 'cancel-edit') {
    // 1. RESTAURATION IMPERATIVE
    if (decalBackup.value) {
      console.log('Restoring backup...', decalBackup.value)

      // OeditingDecaln copie les valeurs du backup dans l'objet réactif
      editingDecal.value.position.copy(decalBackup.value.position)
      editingDecal.value.orientation.copy(decalBackup.value.orientation)
      editingDecal.value.size.copy(decalBackup.value.size)
      editingDecal.value.zIndex = decalBackup.value.zIndex

      decalBackup.value = null
    }

    // 2. Arrêt de l'édition
    editingDecal.value = null

    // 3. Nettoyage UI et Raycasts
    for (const key in currentIntersect) { delete currentIntersect[key] }
    for (const key in decalIntersect) { delete decalIntersect[key] }
    hideBoooooox.value = false

    decalBus.emit({
      type: 'ui-toggle-visibility-decal-intersect',
      visible: false,
    })

    makeGeometryInitial() // Reset du curseur

    console.log('Decal edit cancelled.')

    // 4. FORCE UPDATE des DecalItems
    // C'est vital pour que les decals reprennent leur géométrie d'origine
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
})

onBeforeUnmount(stop)

defineExpose({
  root: meshRef,
})
</script>

<template>
  <TresMesh
    ref="meshRef"
    v-bind="$attrs"
    :material-transparent="true"
    material-polygonOffset
    :material-polygonOffsetFactor="-50"
    :material-depthTest="depthTest"
    :material-map="map"
    name="meshRef decal"
    :render-order="activeRenderOrder"
  >
    >
    <slot></slot>
  </TresMesh>

  <DecalItem
    v-for="(item, index) in stampedDecals"
    :key="item.id"
    :parent="mesh || meshRef?.parent"
    :map="map"
    :group-test="testRefsGroup"
    :highlight="true"
    :decal="item"
    :is-selected="editingDecal?.id === item.id"
    @select="onSelectDecal"
  />

  <TresLine v-if="debug" ref="meshLineRef" :visible="!!(!currentIntersectIsEmpty)" name="decal-line-helper">
    <TresBufferGeometry />
    <TresLineBasicMaterial color="blue" />
  </TresLine>

  <TresMesh
    v-if="!hideBoooooox"
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
