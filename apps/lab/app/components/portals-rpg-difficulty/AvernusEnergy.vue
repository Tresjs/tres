<script setup lang="ts">
import type { Material, Mesh } from 'three/webgpu'
import { Color, DoubleSide, LinearSRGBColorSpace, MeshStandardNodeMaterial } from 'three/webgpu'
import { clamp, float, sin, smoothstep, time, uniform, uv, vec2, vec3, vec4 } from 'three/tsl'
import { blenderNoise3Fac } from './tsl/blenderNoise'
import { energyEndFade, energyPalette, energyRim as energyRimRamp, energyTopFade } from './tsl/avernusFields'

// The GLB materials are restored on unmount because useGLTF caches the scene
// between portal mounts.

const props = defineProps<{
  nodes: Record<string, any>
}>()

const UUID = 'portals-rpg-difficulty'

// Captured values are linear: setRGB with LinearSRGBColorSpace skips the sRGB decode.
const linear = (r: number, g: number, b: number) => new Color().setRGB(r, g, b, LinearSRGBColorSpace)

const uniforms = {
  opacity: uniform(1),
  rimGain: uniform(1),
  wispScale: uniform(1),
  contrast: uniform(14),
  edge: uniform(0.4),
  coreDark: uniform(0.7),
  alphaCutoff: uniform(0.002),
  driftSpeed: uniform(0.3),
  churnSpeed: uniform(0.15),
  pulseSpeed: uniform(0.4),
  pulseAmount: uniform(0.5),
  palette0: uniform(linear(0.800007463, 0.00279104151, 0.026096642)),
  palette1: uniform(linear(0.300010771, 0.000417422998, 0.00549431844)),
  palette2: uniform(linear(0.0250004753, 0.0000500666174, 0.00118516071)),
  palette3: uniform(linear(0.0271967836, 0.000134123649, 0)),
}

// glTF flips V, so the GLB has V = 1 at the groove; the field equations expect Blender's V = 0 there.
const energyUv = vec2(uv().x, float(1).sub(uv().y)).toVar()

// The sample moves down the UV so the wisps rise; the masks read the untouched UV so the
// base and tops stay put. The curtain is flat, so the noise Z axis is free for churn.
const drift = vec3(0, time.mul(uniforms.driftSpeed).negate(), time.mul(uniforms.churnSpeed))
const q = vec3(energyUv, 0).mul(vec3(8.5, 1.6, 1)).mul(uniforms.wispScale).add(drift)
const noiseFac = blenderNoise3Fac(q.mul(2.4), 3.1, 0.65, 0.9)
// The snapshot slope is 8; a higher contrast hardens the wisp edge toward the beam's ribbons.
const threshold = energyUv.y.mul(0.43).add(0.29)
const density = clamp(uniforms.contrast.mul(noiseFac.sub(threshold)), 0, 1).toVar()

// Offset harmonic so the surge never reads as a metronome.
const phase = time.mul(uniforms.pulseSpeed).mul(6.28318).sub(energyUv.y.mul(3))
const pulse = sin(phase).mul(0.35).add(sin(phase.mul(2.3).add(1.7)).mul(0.15)).add(0.5)
const rimMod = pulse.sub(0.5).mul(uniforms.pulseAmount.mul(1.5)).add(1)

// edge = 1 is the snapshot's linear 0.78 * density.
const alpha = smoothstep(0, uniforms.edge, density).mul(0.78).mul(energyTopFade(energyUv.y)).mul(energyEndFade(energyUv.x)).mul(uniforms.opacity)

// density 0 is the crimson rim, 1 the dark core; coreDark < 1 keeps more of the wisp on the rim stops.
const shade = clamp(density.mul(uniforms.coreDark), 0, 1).toVar()
const color = energyPalette(shade, uniforms.palette0, uniforms.palette1, uniforms.palette2, uniforms.palette3).toVar()

// Normal blending: additive cannot paint the dark cores over the background.
// No depth write, so the five crossing sheets do not clip each other.
const curtainMaterial = new MeshStandardNodeMaterial({
  transparent: true,
  depthWrite: false,
  depthTest: true,
  side: DoubleSide,
  metalness: 0,
  roughness: 0.9,
})
curtainMaterial.name = 'AvernusEnergyCurtain'
curtainMaterial.colorNode = vec4(color, alpha)
curtainMaterial.emissiveNode = color.mul(energyRimRamp(shade).mul(5)).mul(uniforms.rimGain).mul(rimMod)
curtainMaterial.alphaTestNode = uniforms.alphaCutoff

// The exported seam quads have normals pointing down (glTF kept Blender's winding),
// so a single-sided material culls them from every camera above the floor.
const seamMaterial = new MeshStandardNodeMaterial({
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
  opacity: { value: uniforms.opacity.value, min: 0, max: 2, step: 0.05 },
  rim: { value: uniforms.rimGain.value, min: 0, max: 4, step: 0.05 },
  wispScale: { value: uniforms.wispScale.value, min: 0.25, max: 4, step: 0.05, label: 'wisp scale' },
  contrast: { value: uniforms.contrast.value, min: 2, max: 40, step: 0.5 },
  edge: { value: uniforms.edge.value, min: 0.02, max: 1, step: 0.01 },
  coreDark: { value: uniforms.coreDark.value, min: 0, max: 2, step: 0.05, label: 'core darkness' },
  drift: { value: uniforms.driftSpeed.value, min: 0, max: 2, step: 0.05 },
  churn: { value: uniforms.churnSpeed.value, min: 0, max: 1, step: 0.01 },
  pulseSpeed: { value: uniforms.pulseSpeed.value, min: 0, max: 3, step: 0.05, label: 'pulse speed' },
  pulseAmount: { value: uniforms.pulseAmount.value, min: 0, max: 1, step: 0.05, label: 'pulse amount' },
  seamGlow: { value: seamMaterial.emissiveIntensity, min: 0, max: 8, step: 0.1, label: 'seam glow' },
}, { uuid: UUID })

watch(energyOpacity, v => uniforms.opacity.value = v)
watch(energyRim, v => uniforms.rimGain.value = v)
watch(energyWispScale, v => uniforms.wispScale.value = v)
watch(energyContrast, v => uniforms.contrast.value = v)
watch(energyEdge, v => uniforms.edge.value = v)
watch(energyCoreDark, v => uniforms.coreDark.value = v)
watch(energyDrift, v => uniforms.driftSpeed.value = v)
watch(energyChurn, v => uniforms.churnSpeed.value = v)
watch(energyPulseSpeed, v => uniforms.pulseSpeed.value = v)
watch(energyPulseAmount, v => uniforms.pulseAmount.value = v)
watch(energySeamGlow, v => seamMaterial.emissiveIntensity = v)
</script>

<template>
  <TresGroup name="AvernusEnergy" />
</template>
