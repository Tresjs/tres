<script setup lang="ts">
import { OrthographicCamera, RepeatWrapping } from 'three'
import { activeColorSetIndex, COLOR_CYCLE_SECONDS, colorSets } from './color-sets'
import { createConeMaterial, createSphereMaterial, uTime, uActiveColorSet } from './tsl/materials'

// 1:1 world-to-pixel ortho frustum so the cone/sphere stay at fixed pixel
// size regardless of canvas dimensions.
const { sizes } = useTres()
const cameraRef = shallowRef<OrthographicCamera>()

watch([sizes.width, sizes.height, cameraRef], () => {
  const cam = cameraRef.value
  if (!cam || !sizes.width.value || !sizes.height.value) return
  cam.left = -sizes.width.value / 2
  cam.right = sizes.width.value / 2
  cam.top = sizes.height.value / 2
  cam.bottom = -sizes.height.value / 2
  cam.updateProjectionMatrix()
}, { immediate: true })

// ── Noise texture ────────────────────────────────────────────────────────────
const { state: noiseTexture } = useTexture('/experiments/vuefes-japan-2025/noise.png')

watch(noiseTexture, (tex) => {
  if (!tex) return
  tex.wrapS = RepeatWrapping
  tex.wrapT = RepeatWrapping
}, { immediate: true })

// ── Materials (created once; re-created when texture loads) ──────────────────
// We need the texture to exist before building materials because texture()
// nodes bake the sampler reference at construction time in Three.js r183.
const coneMaterial = shallowRef<ReturnType<typeof createConeMaterial> | null>(null)
const sphereMaterial = shallowRef<ReturnType<typeof createSphereMaterial> | null>(null)

watch(noiseTexture, (tex) => {
  if (!tex) return
  coneMaterial.value = createConeMaterial(tex)
  sphereMaterial.value = createSphereMaterial(tex)
}, { immediate: true })

// ── Animation loop ───────────────────────────────────────────────────────────
let lastSetIndex = -1
const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uTime.value = elapsed

  const idx = Math.floor(elapsed / COLOR_CYCLE_SECONDS) % colorSets.length
  if (idx !== lastSetIndex) {
    lastSetIndex = idx
    // uActiveColorSet is a uniform(int) node — update its JS-side value
    uActiveColorSet.value = idx
    activeColorSetIndex.value = idx
  }
})

// ── Scene layout (matches original ortho frustum at scale 0.95) ─────────────
const SCALE = 0.95
const CONE_POSITION: [number, number, number] = [-146 * SCALE, -2 * SCALE, 0]
const SPHERE_POSITION: [number, number, number] = [172 * SCALE, 2 * SCALE, 0]
</script>

<template>
  <TresOrthographicCamera
    ref="cameraRef"
    :near="0.1"
    :far="9999"
    :position="[0, 0, 1000]"
    :look-at="[0, 0, 0]"
  />

  <!-- Cone: V-tail discard + solid color1 + soft-light noise -->
  <TresMesh
    v-if="coneMaterial"
    :position="CONE_POSITION"
    :scale="SCALE"
    :rotation="[Math.PI, 0, 0]"
    :material="coneMaterial"
  >
    <TresConeGeometry :args="[192, 330, 128]" />
  </TresMesh>

  <!-- Sphere: spherical UV + sumi ink pattern + soft-light noise -->
  <TresMesh
    v-if="sphereMaterial"
    :position="SPHERE_POSITION"
    :scale="SCALE"
    :material="sphereMaterial"
  >
    <TresSphereGeometry :args="[165, 64, 64]" />
  </TresMesh>

  <OrbitControls />
</template>
