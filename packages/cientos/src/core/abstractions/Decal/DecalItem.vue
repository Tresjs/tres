<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, toRefs, watch } from 'vue'
import { DecalGeometry } from 'three-stdlib'
import {
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  Vector3,
} from 'three'
import { decalBus } from './DecalBus'
// 1. On réimporte useLoop pour l'animation
import { dispose, useLoop } from '@tresjs/core'

const props = defineProps<{
  parent: Mesh
  decal: any
  map: any
  groupTest: any
  highlight: boolean
  isSelected: boolean
}>()

const emit = defineEmits(['select', 'hover'])

const { parent, decal, map, isSelected, highlight } = toRefs(props)

const meshRef = ref<Mesh | null>(null)
const isHovered = ref(false)

const helperLineRef = shallowRef<LineSegments | null>(null)

const originalScale = new Mesh().scale.clone()

// --- GESTION DE LA MÉMOIRE AVEC DISPOSE() ---

const clearHelper = () => {
  if (helperLineRef.value) {
    if (meshRef.value) {
      meshRef.value.remove(helperLineRef.value)
    }
    dispose(helperLineRef.value)
    helperLineRef.value = null
  }
}

// --- CRÉATION OBJETS ---

const createHelper = () => {
  if (!meshRef.value || !meshRef.value.geometry) { return }

  clearHelper()

  const edgesGeometry = new EdgesGeometry(meshRef.value.geometry)

  // 2. On active la transparence pour permettre l'animation d'opacité
  const lineMaterial = new LineBasicMaterial({
    color: 0x0000FF, // Reste toujours BLEU
    depthTest: false,
    linewidth: 2,
    transparent: true, // Important pour le clignotement
    opacity: 1,
  })

  const line = new LineSegments(edgesGeometry, lineMaterial)

  line.raycast = () => {}

  meshRef.value.add(line)
  helperLineRef.value = line

  updateHelperVisuals()
}

const updateHelperVisuals = () => {
  if (!helperLineRef.value) { return }

  // Gère uniquement la visibilité globale (on/off)
  const visible = isHovered.value || isSelected.value
  helperLineRef.value.visible = visible

  // J'ai supprimé le changement de couleur ici, cela reste bleu (défini dans createHelper)
}

// --- ANIMATION (CLIGNOTEMENT) ---

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  // Si le helper n'existe pas ou n'est pas visible, on ne fait rien
  if (!helperLineRef.value || !helperLineRef.value.visible) { return }

  const material = helperLineRef.value.material as LineBasicMaterial

  if (isSelected.value) {
    // 3. Calcul du clignotement (Sinusoidale)
    // elapsed * 10 contrôle la vitesse
    const t = (Math.sin(elapsed * 10) + 1) / 2
    // Opacité oscille entre 0.2 et 1
    material.opacity = 0.2 + t * 0.8
  }
  else {
    // Si juste survolé (pas sélectionné), opacité fixe à 1
    if (material.opacity !== 1) { material.opacity = 1 }
  }
})

// --- LOGIQUE GEOMETRIE (Inchangée) ---

const buildGeometry = () => {
  if (!meshRef.value || !parent.value) { return }

  parent.value.updateMatrixWorld(true)

  if (meshRef.value.geometry) {
    meshRef.value.geometry.dispose()
  }

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
  const parentScale = parent.value.scale.x || 1
  const totalOffset = (baseOffset + currentZ * layerGap) / parentScale

  geometry.translate(
    localNormal.x * totalOffset,
    localNormal.y * totalOffset,
    localNormal.z * totalOffset,
  )

  meshRef.value.geometry = geometry

  createHelper()

  meshRef.value.position.set(0, 0, 0)
  meshRef.value.rotation.set(0, 0, 0)
  meshRef.value.scale.set(1, 1, 1)
  meshRef.value.renderOrder = decal.value.zIndex ?? 0
}

watch(() => decal.value.zIndex, () => {
  buildGeometry()
})

watch([isSelected, isHovered], () => {
  updateHelperVisuals()
  if (!meshRef.value) { return }
  if (!isSelected.value) { meshRef.value.scale.copy(originalScale) }
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
  event.stopPropagation() // Empêche le raycaster de traverser vers le parent
  isHovered.value = true
  document.body.style.cursor = 'pointer'

  // PRÉVENIR LE PARENT
  emit('hover', true)
}

const onPointerLeave = (event: PointerEvent) => {
  // event.stopPropagation() // Pas nécessaire ici
  isHovered.value = false
  document.body.style.cursor = 'auto'

  // PRÉVENIR LE PARENT
  emit('hover', false)
}

onBeforeUnmount(() => {
  clearHelper()

  if (meshRef.value && meshRef.value.geometry) {
    meshRef.value.geometry.dispose()
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
    @click="onClickMesh"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <slot></slot>
  </TresMesh>
</template>
