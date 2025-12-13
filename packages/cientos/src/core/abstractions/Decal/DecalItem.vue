<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, toRefs, watch } from 'vue'
import { EdgesGeometry, LineBasicMaterial, LineSegments, Mesh } from 'three'
import { useLoop } from '@tresjs/core'
import { decalBus } from './DecalBus'
import { updateDecalGeometry } from './DecalUtils'
import type { DecalData } from './DecalTypes'

const props = defineProps<{
  parent: Mesh
  decal: DecalData
  map: any
  highlight: boolean
  isSelected: boolean
  debug: boolean
}>()

const emit = defineEmits(['select', 'hover'])
const { parent, decal, highlight, isSelected, debug } = toRefs(props)

const meshRef = ref<Mesh | null>(null)
const helperLineRef = shallowRef<LineSegments | null>(null)
const isHovered = ref(false)
const originalScale = new Mesh().scale.clone()

const updateHelperVisuals = () => {
  if (!helperLineRef.value) { return }
  helperLineRef.value.visible = isHovered.value || isSelected.value
}

const clearHelper = () => {
  if (!helperLineRef.value) { return }

  const line = helperLineRef.value

  meshRef.value?.remove(line)

  line.geometry.dispose()

  if (Array.isArray(line.material)) {
    line.material.forEach(mat => mat.dispose())
  }
  else {
    line.material.dispose()
  }

  helperLineRef.value = null
}

const createHelper = () => {
  if (!meshRef.value?.geometry) { return }
  clearHelper()

  const edgesGeometry = new EdgesGeometry(meshRef.value.geometry)
  const lineMaterial = new LineBasicMaterial({
    color: 0x0000FF,
    depthTest: false,
  })

  const line = new LineSegments(edgesGeometry, lineMaterial)
  line.raycast = () => {}

  meshRef.value.add(line)
  helperLineRef.value = line
  updateHelperVisuals()
}

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
  if (!helperLineRef.value?.visible) { return }
  const material = helperLineRef.value.material as LineBasicMaterial

  if (isSelected.value) {
    const t = (Math.sin(elapsed * 10) + 1) / 2
    material.opacity = 0.2 + t * 0.8
  }
  else if (material.opacity !== 1) {
    material.opacity = 1
  }
})

const buildGeometry = () => {
  if (!meshRef.value || !parent.value) { return }

  updateDecalGeometry(meshRef.value, parent.value, decal.value)

  createHelper()

  meshRef.value.position.set(0, 0, 0)
  meshRef.value.rotation.set(0, 0, 0)
  meshRef.value.scale.set(1, 1, 1)
  meshRef.value.renderOrder = decal.value.zIndex ?? 0
}

watch(() => decal.value.zIndex, buildGeometry)

watch([isSelected, isHovered], () => {
  updateHelperVisuals()
  if (meshRef.value && !isSelected.value) {
    meshRef.value.scale.copy(originalScale)
  }
})

watch(
  [() => decal.value.position, () => decal.value.orientation, () => decal.value.size],
  buildGeometry,
  { deep: true },
)

watch(meshRef, () => {
  if (!meshRef.value) { return }

  buildGeometry()
  originalScale.copy(meshRef.value.scale)
}, { immediate: true })

const stopBus = decalBus.on((payload) => {
  if (debug.value && payload.type === 'refresh-raycasts') {
    buildGeometry()
  }
})

const materialIsTransparent = computed(() => isSelected.value ? true : !highlight.value)

watch(materialIsTransparent, async () => {
  if (!meshRef.value) { return }
  await nextTick()

  const m = meshRef.value.material

  if (Array.isArray(m)) {
    m.forEach(mat => (mat.needsUpdate = true))
  }
  else { m.needsUpdate = true }
})

const onClickMesh = (event: MouseEvent) => {
  event.stopPropagation()
  if (debug.value) { emit('select', decal.value) }
}

const onPointerEnter = (event: PointerEvent) => {
  event.stopPropagation()
  if (!debug.value) { return }
  isHovered.value = true
  document.body.style.cursor = 'pointer'
  emit('hover', true)
}

const onPointerLeave = () => {
  if (!debug.value) { return }
  isHovered.value = false
  document.body.style.cursor = 'auto'
  emit('hover', false)
}

onBeforeUnmount(() => {
  clearHelper()
  stopBus()
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
    @click="onClickMesh"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <slot></slot>
  </TresMesh>
</template>
