<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, toRaw, toRefs, watch } from 'vue'
import { DecalGeometry } from 'three-stdlib'
import { Mesh, MeshBasicMaterial, Vector3 } from 'three'
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
const boxHelper = shallowRef(null)
const isHovered = ref(false)

const originalScale = new Mesh().scale.clone()

// watch(() => [meshRef.value, parent.value], () => {
//   const p = toRaw(parent.value)
//   const m = toRaw(meshRef.value)

//   // Si on a le parent et le mesh du sticker
//   if (p && m) {
//     // On force l'attachement parent-enfant natif de Three.js
//     // Cela corrige instantanément la position et l'échelle
//     p.attach(m)
//   }
// }, { immediate: true })

const updateRaycastClone = () => {
  if (!props.groupTest || !meshRef.value) { return }

  if (!raycastMesh.value) {
    raycastMesh.value = new Mesh(
      meshRef.value.geometry,
      new MeshBasicMaterial({ visible: false }),
    )

    raycastMesh.value.name = `raycast-decal-${decal.value.id}`
    raycastMesh.value.userData = {
      id: decal.value.id,
      originalUuid: decal.value.uuid,
    }

    props.groupTest.add(raycastMesh.value)
  }
  else {
    raycastMesh.value.geometry = meshRef.value.geometry
  }
}

const buildGeometry = () => {
  if (!meshRef.value || !parent.value) { return }

  parent.value.updateMatrixWorld(true)

  const geometry = new DecalGeometry(
    parent.value,
    decal.value.position,
    decal.value.orientation,
    decal.value.size,
  )

  const inverseMatrix = parent.value.matrixWorld.clone().invert()

  geometry.applyMatrix4(inverseMatrix)

  const worldNormal = new Vector3(0, 0, 1).applyEuler(decal.value.orientation)
  const localNormal = worldNormal.clone().transformDirection(inverseMatrix).normalize()

  const baseOffset = 0.01
  const layerGap = 0.001
  const currentZ = decal.value.zIndex ?? 0
  const parentScale = parent.value.scale.x || 1 // Approximation uniforme
  const totalOffset = (baseOffset + currentZ * layerGap) / parentScale

  geometry.translate(
    localNormal.x * totalOffset,
    localNormal.y * totalOffset,
    localNormal.z * totalOffset,
  )

  if (meshRef.value.geometry) { meshRef.value.geometry.dispose() }
  meshRef.value.geometry = geometry

  meshRef.value.position.set(0, 0, 0)
  meshRef.value.rotation.set(0, 0, 0)
  meshRef.value.scale.set(1, 1, 1)
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
  if (!selected) { meshRef.value.scale.copy(originalScale) }
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (raycastMesh.value && parent.value) {
    parent.value.updateMatrixWorld()

    parent.value.matrixWorld.decompose(
      raycastMesh.value.position,
      raycastMesh.value.quaternion,
      raycastMesh.value.scale,
    )

    raycastMesh.value.updateMatrixWorld()
  }

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

  if (isSelected.value || isHovered.value) {
    const speed = 5
    const minO = 0.2
    const maxO = 1
    const t = (Math.sin(localElapsed * speed) + 1) / 2
    const opacity = minO + t * (maxO - minO)
    material.opacity = opacity
    material.needsUpdate = true
  }
})

watch(
  [() => decal.value.position, () => decal.value.orientation, () => decal.value.size],
  () => {
    buildGeometry()
  },
  { deep: true },
)

watch([meshRef, () => props.groupTest], () => {
  if (!meshRef.value || !props.groupTest) { return }

  buildGeometry()
  originalScale.copy(meshRef.value.scale)
}, { immediate: true })

const stop = decalBus.on((payload) => {
  if (payload.type === 'refresh-raycasts') {
    buildGeometry()
    updateRaycastClone()
  }
})

const materialIsTransparent = computed(() => {
  if (isSelected.value) { return true }
  return !highlight.value
})

watch(materialIsTransparent, async () => {
  if (!meshRef.value) { return }
  await nextTick()
  meshRef.value.material.needsUpdate = true
})

const onClickMesh = (event: MouseEvent) => {
  event.stopPropagation()
  emit('select', decal.value)
}

const onPointerEnter = (event: PointerEvent) => {
  console.log('pointer enter decal item')
  event.stopPropagation()
  isHovered.value = true
}

const onPointerLeave = (event: PointerEvent) => {
  console.log('pointer leave decal item')
  isHovered.value = false
}

onBeforeUnmount(() => {
  if (raycastMesh.value && props.groupTest) {
    props.groupTest.remove(raycastMesh.value)

    if (raycastMesh.value.geometry) { raycastMesh.value.geometry.dispose() }
    if (raycastMesh.value.material) { (raycastMesh.value.material as any).dispose() }

    raycastMesh.value = null
  }

  stop()
})

defineExpose({ meshRef })
</script>

<template>
  <TresMesh
    ref="meshRef"
    :name="`decal-${decal.id}`"
    :render-order="decal.zIndex ?? 0"
    :material-transparent="true"
    :material-polygonOffset="true"
    :material-polygonOffsetFactor="-(10 + (decal.zIndex ?? 0))"
    :material-depthTest="true"
    :material-map="map"
    :material-opacity="isSelected ? 0.5 : 1"
    @click="onClickMesh"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <slot></slot>
  </TresMesh>
</template>
