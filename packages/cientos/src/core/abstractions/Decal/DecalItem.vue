<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, toRaw, toRefs, watch } from 'vue'
import { DecalGeometry } from 'three-stdlib'
import { Mesh, MeshBasicMaterial } from 'three'
import { useLoop } from '@tresjs/core'
import { decalBus } from './DecalBus'

const props = defineProps<{
  parent: Mesh
  decal: any
  map: any
  groupTest: any
  highlight: boolean
  isSelected: boolean
}>()

const emit = defineEmits(['select'])
let localElapsed = 0
const wasSelected = ref(false)

const { parent, decal, map, isSelected, highlight } = toRefs(props)

const meshRef = ref<Mesh | null>(null)
const raycastMesh = ref<Mesh | null>(null)
const originalScale = new Mesh().scale.clone() // remplacé après le mount

const updateRaycastClone = () => {
  if (!props.groupTest || !meshRef.value) { return }

  if (!raycastMesh.value) {
    raycastMesh.value = new Mesh(meshRef.value.geometry, new MeshBasicMaterial({ visible: false }))
    raycastMesh.value.name = `raycast-decal-${decal.value.id}`

    raycastMesh.value.userData = { id: decal.value.id, originalUuid: decal.value.uuid }

    props.groupTest.add(raycastMesh.value)
  }
  else {
    raycastMesh.value.geometry = meshRef.value.geometry

    raycastMesh.value.position.copy(meshRef.value.position)
    raycastMesh.value.rotation.copy(meshRef.value.rotation)
    raycastMesh.value.scale.copy(meshRef.value.scale)
  }
}

const buildGeometry = () => {
  if (!meshRef.value || !parent.value) { return }

  const geometry = new DecalGeometry(
    parent.value,
    decal.value.position,
    decal.value.orientation,
    decal.value.size,
  )

  const n = decal.value.face.normal.clone()
  n.transformDirection(parent.value.matrixWorld)
  n.normalize()

  const baseOffset = 0.01
  const layerGap = 0.001
  const currentZ = decal.value.zIndex ?? 0

  const totalOffset = baseOffset + (currentZ * layerGap)

  geometry.translate(n.x * totalOffset, n.y * totalOffset, n.z * totalOffset)

  if (meshRef.value.geometry) {
    meshRef.value.geometry.dispose()
  }

  meshRef.value.geometry = geometry
  meshRef.value.position.set(0, 0, 0)

  meshRef.value.renderOrder = decal.value.zIndex ?? 0

  updateRaycastClone()
}

watch(() => decal.value.zIndex, () => {
  buildGeometry()
})

watch(isSelected, (selected) => {
  if (!meshRef.value) { return }
  const material = meshRef.value.material as any

  if (!selected) {
    material.opacity = 1
    material.needsUpdate = true
  }
})

watch(isSelected, (selected) => {
  if (!meshRef.value) { return }

  if (!selected) {
    // réinitialisation du scale
    meshRef.value.scale.copy(originalScale)
  }
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (!meshRef.value) { return }
  const material = meshRef.value.material as any

  if (isSelected.value && !wasSelected.value) {
    localElapsed = 0
    wasSelected.value = true
  }

  if (!isSelected.value && wasSelected.value) {
    localElapsed = 0
    wasSelected.value = false
  }

  localElapsed += delta

  if (isSelected.value) {
    const speed = 5
    const minO = 0.4
    const maxO = 1

    const t = (Math.sin(localElapsed * speed) + 1) / 2
    const opacity = minO + t * (maxO - minO)

    material.opacity = opacity
    material.needsUpdate = true
  }
})

watch([() => decal.value.position, () => decal.value.orientation, () => decal.value.size], () => {
  buildGeometry()
}, { deep: true })

watch([meshRef, () => props.groupTest], () => {
  if (!meshRef.value || !props.groupTest) { return }
  buildGeometry()

  originalScale.copy(meshRef.value.scale) // on garde la vraie échelle du mesh
}, { immediate: true })

const onClickMesh = (event: MouseEvent) => {
  event.stopPropagation()
  emit('select', decal.value)
}

const stop = decalBus.on((payload) => {
  if (payload.type === 'refresh-raycasts') {
    // Rebuild geometry du decal existant
    buildGeometry()

    // Regénère le clone raycastMesh
    updateRaycastClone()
  }
})

const materialIsTransparent = computed(() => {
  if (isSelected.value) { return isSelected.value }
  return !highlight.value
})

watch(materialIsTransparent, async () => {
  if (!meshRef.value) { return }
  await nextTick()
  meshRef.value.material.needsUpdate = true
})

onBeforeUnmount(() => {
  if (raycastMesh.value && props.groupTest) {
    props.groupTest.remove(raycastMesh.value)
    if (raycastMesh.value.geometry) { raycastMesh.value.geometry.dispose() }
    if (raycastMesh.value.material) { (raycastMesh.value.material as any).dispose() }
    raycastMesh.value = null
  }

  stop()
})

defineExpose({
  meshRef,
})
</script>

<template>
  <TresMesh
    ref="meshRef"
    :name="`decal-${decal.id}`"
    :render-order="decal.zIndex ?? 0"
    @click="onClickMesh"
  >
    <TresMeshBasicMaterial
      :map="map"
      :polygonOffset="true"
      :transparent="true"
      :opacity="isSelected ? 0.5 : 1"
      :depthTest="true"
      :polygonOffsetFactor="-10 - (decal.zIndex ?? 0)"
    />
  </TresMesh>
</template>
