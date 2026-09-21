<script setup lang="ts">
import type { Material, Mesh } from 'three'
import { MeshPhysicalMaterial } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import blenderNoise from './shaders/blender-noise.glsl?raw'
import avernusFields from './shaders/avernus-fields.glsl?raw'
import lavaVertex from './shaders/lava-vertex.glsl?raw'
import lavaFragment from './shaders/lava-fragment.glsl?raw'

// MAT_Lava_Flowing_Magma from the 2026-09-21 Blender snapshot, rebuilt as a
// CustomShaderMaterial over MeshPhysicalMaterial so the dark crust still
// answers to the light rig. The GLB material stays intact and is restored on
// unmount, because useGLTF caches the scene between portal mounts.

const props = defineProps<{
  nodes: Record<string, any>
}>()

const UUID = 'portals-rpg-difficulty'

// Snapshot defaults. Blender's Specular IOR Level 0.3 is 0.6 of its 0.5
// default, and Three's specularIntensity scales F0 the same way. Emission
// gain 1 is the captured value; 0.6 compensates for the lab's bloom pass,
// which pushes the 1.9x fissure emission from orange to yellow-white.
const uniforms = {
  uWarpAmount: { value: 1.25 },
  uPlateScale: { value: 1.05 },
  uEmissionGain: { value: 0.6 },
  uBumpStrength: { value: 0.5 },
  uBumpDistance: { value: 0.055 },
  uFineDetail: { value: 1 },
  uDebugView: { value: 0 },
  uTime: { value: 0 },
  // Blender units per second along the flow axis, and noise-Z units per
  // second for the churn. The snapshot is a still frame, so these are tuned
  // by eye: slow enough that the crust reads as solid rock, not a conveyor.
  uFlowSpeed: { value: 0.04 },
  uChurnSpeed: { value: 0.08 },
}

const material = new CustomShaderMaterial({
  baseMaterial: MeshPhysicalMaterial,
  vertexShader: lavaVertex,
  fragmentShader: blenderNoise + avernusFields + lavaFragment,
  uniforms,
  metalness: 0,
  roughness: 1,
  ior: 1.5,
  specularIntensity: 0.6,
})
material.name = 'AvernusLava'

const lake = computed<Mesh | undefined>(() => props.nodes.GEO_Lava_Lake)

let patched: Mesh | null = null
let original: Material | Material[] | null = null

// immediate: the nodes are already loaded when a cached portal remounts.
watch(lake, (mesh) => {
  if (!mesh || patched) { return }
  patched = mesh
  original = mesh.material
  mesh.material = material
}, { immediate: true })

onUnmounted(() => {
  if (patched && original) { patched.material = original }
  material.dispose()
})

const {
  lavaWarp,
  lavaPlateScale,
  lavaEmission,
  lavaBump,
  lavaSpecular,
  lavaFineDetail,
  lavaDebugView,
  lavaFlowSpeed,
  lavaChurnSpeed,
} = useControls('lava', {
  warp: { value: uniforms.uWarpAmount.value, min: 0, max: 3, step: 0.01 },
  flowSpeed: { value: uniforms.uFlowSpeed.value, min: 0, max: 0.5, step: 0.005, label: 'flow speed' },
  churnSpeed: { value: uniforms.uChurnSpeed.value, min: 0, max: 0.5, step: 0.005, label: 'churn speed' },
  plateScale: { value: uniforms.uPlateScale.value, min: 0.2, max: 4, step: 0.01, label: 'plate scale' },
  emission: { value: uniforms.uEmissionGain.value, min: 0, max: 6, step: 0.05 },
  bump: { value: uniforms.uBumpStrength.value, min: 0, max: 3, step: 0.05 },
  specular: { value: 0.6, min: 0, max: 1, step: 0.05 },
  // Drops the scale-22 pitting noise, the most expensive octaves for the
  // least visible detail. It only feeds the bump height.
  fineDetail: { value: true, type: 'boolean', label: 'fine detail' },
  debugView: {
    value: 0,
    options: [
      { text: 'final', value: 0 },
      { text: 'molten mask', value: 1 },
      { text: 'height', value: 2 },
    ],
    label: 'debug view',
  },
}, { uuid: UUID })

watch(lavaWarp, v => uniforms.uWarpAmount.value = v)
watch(lavaPlateScale, v => uniforms.uPlateScale.value = v)
watch(lavaEmission, v => uniforms.uEmissionGain.value = v)
watch(lavaBump, v => uniforms.uBumpStrength.value = v)
watch(lavaSpecular, v => material.specularIntensity = v)
watch(lavaFineDetail, v => uniforms.uFineDetail.value = v ? 1 : 0)
watch(lavaDebugView, v => uniforms.uDebugView.value = Number(v))
watch(lavaFlowSpeed, v => uniforms.uFlowSpeed.value = v)
watch(lavaChurnSpeed, v => uniforms.uChurnSpeed.value = v)

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.uTime.value = elapsed
})
</script>

<template>
  <TresGroup name="AvernusLava" />
</template>
