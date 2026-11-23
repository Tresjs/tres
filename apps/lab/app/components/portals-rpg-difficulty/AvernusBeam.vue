<script setup lang="ts">
import type { Group, Mesh, Object3D } from 'three/webgpu'
import { Color, CylinderGeometry, DoubleSide, LinearSRGBColorSpace, MeshStandardNodeMaterial, Quaternion, Vector3 } from 'three/webgpu'
import { atan, clamp, cos, float, mix, normalize, positionGeometry, sin, smoothstep, time, uniform, uv, varying, vec2, vec3, vec4 } from 'three/tsl'
import { blenderNoise3Fac } from './tsl/blenderNoise'
import { energyPalette, energyRim } from './tsl/avernusFields'

// Shaped like the three.js webgpu_tsl_vfx_tornado example (bright streaks under a
// wider black shell), shaded like the curtains in AvernusEnergy.vue.

const props = defineProps<{
  nodes: Record<string, any>
}>()

const UUID = 'portals-rpg-difficulty'

const TAU = 6.28318530718

// Captured values are linear already, see AvernusEnergy.vue.
const linear = (r: number, g: number, b: number) => new Color().setRGB(r, g, b, LinearSRGBColorSpace)

// Shared uniform nodes: one slider drives both layers.
const shared = {
  radiusHeart: uniform(0),
  radiusKnight: uniform(0.45),
  turbulence: uniform(0.2),
  turbulenceFreq: uniform(20),
  // Positive flows chest to heart (the shaders negate time), so the knight reads as drained.
  timeScale: uniform(0.08),
  opacity: uniform(0.2),
  edge: uniform(0.1),
  skew: uniform(-0.45),
  streakScale: uniform(5),
  darkOpacity: uniform(0.6),
  rimGain: uniform(1),
  coreDark: uniform(1.5),
  palette0: uniform(linear(0.800007463, 0.00279104151, 0.026096642)),
  palette1: uniform(linear(0.300010771, 0.000417422998, 0.00549431844)),
  palette2: uniform(linear(0.0250004753, 0.0000500666174, 0.00118516071)),
  palette3: uniform(linear(0.0271967836, 0.000134123649, 0)),
}

const darkOffset = uniform(0.04)

// V = 0 at the heart, V = 1 at the knight's chest.
const along = uv().y
// A vector varying interpolates across the 2pi wrap; an angle would not.
const ring = varying(normalize(positionGeometry.xz))

const rotate = (v: any, a: any) => vec2(v.x.mul(cos(a)).sub(v.y.mul(sin(a))), v.x.mul(sin(a)).add(v.y.mul(cos(a))))

// Noise is sampled on the ring vector instead of UV so the tube has no seam; the reference
// skew (u += v) becomes a ring rotation by the distance along the beam.
function streak(speed: number, scale: [number, number], seed: number) {
  // Negated so positive speed scrolls toward the heart (V = 0).
  const t = time.mul(shared.timeScale).negate()
  const turns = t.mul(speed).add(shared.skew.mul(along.sub(t)))
  const r = rotate(ring, turns.mul(TAU)).mul(scale[0] / TAU)
  const a = along.sub(t).mul(scale[1])
  const n = blenderNoise3Fac(vec3(r, a.add(seed)).mul(shared.streakScale), 0, 0.5, 0)
  return clamp(n.sub(0.45).div(0.25), 0, 1)
}

function makeMaterial(dark: boolean) {
  const seed = dark ? 123.4 : 0
  const radiusOffset = dark ? darkOffset : float(0)

  // After twistedCylinder() of the tornado example. Scaled by the local radius so the thin end near the heart does not fold over.
  const angle = atan(positionGeometry.z, positionGeometry.x)
  const baseRadius = mix(shared.radiusHeart, shared.radiusKnight, along).add(radiusOffset)
  const radius = baseRadius.add(sin(along.add(time.mul(shared.timeScale)).mul(shared.turbulenceFreq).add(angle.mul(2))).mul(shared.turbulence).mul(baseRadius))

  const noise1 = streak(1, [2, 0.25], seed)
  const noise2 = streak(0.5, [5, 1], seed + 37.1)

  // Reference fades: 0.1 (bright) / 0.2 (dark) in at the base, 0.4 out at the top.
  const fadeIn = smoothstep(0, dark ? 0.2 : 0.1, along)
  const fadeOut = smoothstep(0, 0.4, float(1).sub(along))
  const effect = noise1.mul(noise2).mul(fadeIn.min(fadeOut)).toVar()

  const alpha = smoothstep(0, dark ? float(0.01) : shared.edge, effect).mul(dark ? shared.darkOpacity : shared.opacity)

  // density 0 is the bright rim, 1 the dark core, so the ribbon edge glows and its middle goes dark.
  const density = clamp(effect.mul(shared.coreDark), 0, 1).toVar()
  const color = energyPalette(density, shared.palette0, shared.palette1, shared.palette2, shared.palette3).toVar()

  const material = new MeshStandardNodeMaterial({
    transparent: true,
    // Depth writes on: the shell's ribbons hide the bright ones behind them, which makes the beam read as woven.
    depthWrite: true,
    depthTest: true,
    side: DoubleSide,
    metalness: 0,
    roughness: 0.9,
  })
  material.name = dark ? 'AvernusBeamDark' : 'AvernusBeamBright'
  material.positionNode = vec3(positionGeometry.x.mul(radius), positionGeometry.y, positionGeometry.z.mul(radius))
  material.colorNode = vec4(dark ? vec3(0) : color, alpha)
  material.emissiveNode = dark ? vec3(0) : color.mul(energyRim(density).mul(5)).mul(shared.rimGain)
  // Depth writes stay on so the two layers occlude each other; empty fragments must not write depth.
  material.alphaTestNode = float(0.01)
  return material
}

const brightMaterial = makeMaterial(false)
const darkMaterial = makeMaterial(true)

// Unit size: the taper lives in the vertex shader, the length in the group's Y scale.
const geometry = new CylinderGeometry(1, 1, 1, 48, 64, true)

const heart = computed<Mesh | undefined>(() => props.nodes.DemonHeart)
// Both rigs have a `chest` bone and GLTFLoader dedupes the second to `chest_1`,
// so match the prefix inside the knight rig.
const chest = computed<Object3D | undefined>(() => {
  let bone: Object3D | undefined
  props.nodes.Rig_Knight?.traverse((o: Object3D) => {
    if (!bone && /^chest(?:_\d+)?$/.test(o.name)) { bone = o }
  })
  return bone
})

const beam = shallowRef<Group | null>(null)

const heartCenter = new Vector3()
const from = new Vector3()
const to = new Vector3()
const direction = new Vector3()
const up = new Vector3(0, 1, 0)
const aim = new Quaternion()

// The heart mesh is off its origin, so aim from the bounding sphere centre.
watch(heart, (mesh) => {
  if (!mesh?.geometry) { return }
  mesh.geometry.computeBoundingSphere()
  heartCenter.copy(mesh.geometry.boundingSphere!.center)
}, { immediate: true })

const {
  beamRadiusHeart,
  beamRadiusKnight,
  beamDarkOffset,
  beamTurbulence,
  beamTurbulenceFreq,
  beamSpeed,
  beamSkew,
  beamStreakScale,
  beamEdge,
  beamRim,
  beamCoreDark,
  beamDarkOpacity,
  beamOpacity,
} = useControls('beam', {
  radiusHeart: { value: shared.radiusHeart.value, min: 0, max: 1, step: 0.01, label: 'radius heart' },
  radiusKnight: { value: shared.radiusKnight.value, min: 0, max: 1.5, step: 0.01, label: 'radius knight' },
  darkOffset: { value: darkOffset.value, min: 0, max: 0.2, step: 0.005, label: 'dark shell offset' },
  turbulence: { value: shared.turbulence.value, min: 0, max: 0.6, step: 0.01 },
  turbulenceFreq: { value: shared.turbulenceFreq.value, min: 0, max: 40, step: 0.5, label: 'turbulence freq' },
  speed: { value: shared.timeScale.value, min: -1, max: 1, step: 0.01 },
  skew: { value: shared.skew.value, min: -3, max: 3, step: 0.05 },
  streakScale: { value: shared.streakScale.value, min: 0.25, max: 12, step: 0.05, label: 'streak scale' },
  darkOpacity: { value: shared.darkOpacity.value, min: 0, max: 1, step: 0.05, label: 'dark shell opacity' },
  edge: { value: shared.edge.value, min: 0.001, max: 0.5, step: 0.001 },
  rim: { value: shared.rimGain.value, min: 0, max: 4, step: 0.05 },
  coreDark: { value: shared.coreDark.value, min: 0, max: 8, step: 0.1, label: 'core darkness' },
  opacity: { value: shared.opacity.value, min: 0, max: 1, step: 0.05 },
}, { uuid: UUID })

watch(beamRadiusHeart, v => shared.radiusHeart.value = v)
watch(beamRadiusKnight, v => shared.radiusKnight.value = v)
watch(beamDarkOffset, v => darkOffset.value = v)
watch(beamTurbulence, v => shared.turbulence.value = v)
watch(beamTurbulenceFreq, v => shared.turbulenceFreq.value = v)
watch(beamSpeed, v => shared.timeScale.value = v)
watch(beamSkew, v => shared.skew.value = v)
watch(beamStreakScale, v => shared.streakScale.value = v)
watch(beamEdge, v => shared.edge.value = v)
watch(beamRim, v => shared.rimGain.value = v)
watch(beamCoreDark, v => shared.coreDark.value = v)
watch(beamDarkOpacity, v => shared.darkOpacity.value = v)
watch(beamOpacity, v => shared.opacity.value = v)

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  const group = beam.value
  if (!group?.parent || !heart.value || !chest.value) { return }

  // getWorldPosition refreshes ancestor matrices, so the chest follows this frame's pose.
  heart.value.localToWorld(from.copy(heartCenter))
  chest.value.getWorldPosition(to)
  group.parent.worldToLocal(from)
  group.parent.worldToLocal(to)

  direction.subVectors(to, from)
  const length = direction.length()
  if (length < 1e-4) { return }
  direction.divideScalar(length)

  group.position.addVectors(from, to).multiplyScalar(0.5)
  group.quaternion.copy(aim.setFromUnitVectors(up, direction))
  group.scale.set(1, length, 1)
})

onUnmounted(() => {
  brightMaterial.dispose()
  darkMaterial.dispose()
  geometry.dispose()
})
</script>

<template>
  <TresGroup ref="beam" name="AvernusBeam">
    <TresMesh
      name="AvernusBeamBright"
      :geometry="geometry"
      :material="brightMaterial"
      :frustum-culled="false"
    />
    <TresMesh
      name="AvernusBeamDark"
      :geometry="geometry"
      :material="darkMaterial"
      :frustum-culled="false"
    />
  </TresGroup>
</template>
