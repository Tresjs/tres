<script setup lang="ts">
import type { Material, Mesh } from 'three'
import { Color, DoubleSide, LinearSRGBColorSpace, MeshStandardMaterial, NormalBlending } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import blenderNoise from './shaders/blender-noise.glsl?raw'
import avernusFields from './shaders/avernus-fields.glsl?raw'
import energyVertex from './shaders/energy-vertex.glsl?raw'
import energyFragment from './shaders/energy-fragment.glsl?raw'

// The GLB materials are restored on unmount because useGLTF caches the scene
// between portal mounts.

const props = defineProps<{
  nodes: Record<string, any>
}>()

const UUID = 'portals-rpg-difficulty'

// Captured values are linear: setRGB with LinearSRGBColorSpace skips the sRGB decode.
const linear = (r: number, g: number, b: number) => new Color().setRGB(r, g, b, LinearSRGBColorSpace)

const uniforms = {
  uOpacity: { value: 1 },
  uRimGain: { value: 1 },
  uWispScale: { value: 1 },
  uContrast: { value: 14 },
  uEdge: { value: 0.4 },
  uCoreDark: { value: 0.7 },
  uAlphaCutoff: { value: 0.002 },
  uDriftSpeed: { value: 0.3 },
  uChurnSpeed: { value: 0.15 },
  uPulseSpeed: { value: 0.4 },
  uPulseAmount: { value: 0.5 },
  uTime: { value: 0 },
  uPalette0: { value: linear(0.800007463, 0.00279104151, 0.026096642) },
  uPalette1: { value: linear(0.300010771, 0.000417422998, 0.00549431844) },
  uPalette2: { value: linear(0.0250004753, 0.0000500666174, 0.00118516071) },
  uPalette3: { value: linear(0.0271967836, 0.000134123649, 0) },
}

// Normal blending: additive cannot paint the dark cores over the background.
// No depth write, so the five crossing sheets do not clip each other.
const curtainMaterial = new CustomShaderMaterial({
  baseMaterial: MeshStandardMaterial,
  vertexShader: energyVertex,
  fragmentShader: blenderNoise + avernusFields + energyFragment,
  uniforms,
  transparent: true,
  depthWrite: false,
  depthTest: true,
  side: DoubleSide,
  blending: NormalBlending,
  premultipliedAlpha: false,
  metalness: 0,
  roughness: 0.9,
})
curtainMaterial.name = 'AvernusEnergyCurtain'

// The exported seam quads have normals pointing down (glTF kept Blender's winding),
// so a single-sided material culls them from every camera above the floor.
const seamMaterial = new MeshStandardMaterial({
  color: linear(0.280012816, 0, 0.001678135),
  emissive: linear(0.750007927, 0.096426308, 0.058329098),
  emissiveIntensity: 3.2,
  roughness: 0.5,
  metalness: 0,
  side: DoubleSide,
})
seamMaterial.name = 'AvernusEnergySeam'

const pick = (prefix: string) => Object.values(props.nodes).filter((n): n is Mesh => n.name.startsWith(prefix))
const curtains = computed(() => pick('GEO_Pentagram_Energy_Plane_'))
const seams = computed(() => pick('GEO_Pentagram_Energy_Seam_'))

const originals = new Map<Mesh, Material | Material[]>()

function swap(meshes: Mesh[], material: Material, castShadow: boolean) {
  for (const mesh of meshes) {
    if (originals.has(mesh)) { continue }
    originals.set(mesh, mesh.material)
    mesh.material = material
    mesh.castShadow = castShadow
  }
}

// immediate: the nodes are already loaded when a cached portal remounts.
watch([curtains, seams], ([planes, ribbons]) => {
  // Source curtains have visible_shadow=false.
  swap(planes, curtainMaterial, false)
  swap(ribbons, seamMaterial, true)
}, { immediate: true })

onUnmounted(() => {
  for (const [mesh, material] of originals) { mesh.material = material }
  curtainMaterial.dispose()
  seamMaterial.dispose()
})

const {
  energyOpacity,
  energyRim,
  energyWispScale,
  energyContrast,
  energyEdge,
  energyCoreDark,
  energyDrift,
  energyChurn,
  energyPulseSpeed,
  energyPulseAmount,
  energySeamGlow,
} = useControls('energy', {
  opacity: { value: uniforms.uOpacity.value, min: 0, max: 2, step: 0.05 },
  rim: { value: uniforms.uRimGain.value, min: 0, max: 4, step: 0.05 },
  wispScale: { value: uniforms.uWispScale.value, min: 0.25, max: 4, step: 0.05, label: 'wisp scale' },
  contrast: { value: uniforms.uContrast.value, min: 2, max: 40, step: 0.5 },
  edge: { value: uniforms.uEdge.value, min: 0.02, max: 1, step: 0.01 },
  coreDark: { value: uniforms.uCoreDark.value, min: 0, max: 2, step: 0.05, label: 'core darkness' },
  drift: { value: uniforms.uDriftSpeed.value, min: 0, max: 2, step: 0.05 },
  churn: { value: uniforms.uChurnSpeed.value, min: 0, max: 1, step: 0.01 },
  pulseSpeed: { value: uniforms.uPulseSpeed.value, min: 0, max: 3, step: 0.05, label: 'pulse speed' },
  pulseAmount: { value: uniforms.uPulseAmount.value, min: 0, max: 1, step: 0.05, label: 'pulse amount' },
  seamGlow: { value: seamMaterial.emissiveIntensity, min: 0, max: 8, step: 0.1, label: 'seam glow' },
}, { uuid: UUID })

watch(energyOpacity, v => uniforms.uOpacity.value = v)
watch(energyRim, v => uniforms.uRimGain.value = v)
watch(energyWispScale, v => uniforms.uWispScale.value = v)
watch(energyContrast, v => uniforms.uContrast.value = v)
watch(energyEdge, v => uniforms.uEdge.value = v)
watch(energyCoreDark, v => uniforms.uCoreDark.value = v)
watch(energyDrift, v => uniforms.uDriftSpeed.value = v)
watch(energyChurn, v => uniforms.uChurnSpeed.value = v)
watch(energyPulseSpeed, v => uniforms.uPulseSpeed.value = v)
watch(energyPulseAmount, v => uniforms.uPulseAmount.value = v)
watch(energySeamGlow, v => seamMaterial.emissiveIntensity = v)

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.uTime.value = elapsed
})
</script>

<template>
  <TresGroup name="AvernusEnergy" />
</template>
