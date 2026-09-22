<script setup lang="ts">
import type { Group, Mesh, Object3D } from 'three'
import { Color, CylinderGeometry, DoubleSide, LinearSRGBColorSpace, MeshStandardMaterial, NormalBlending, Quaternion, Vector3 } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import blenderNoise from './shaders/blender-noise.glsl?raw'
import avernusFields from './shaders/avernus-fields.glsl?raw'
import beamVertex from './shaders/beam-vertex.glsl?raw'
import beamFragment from './shaders/beam-fragment.glsl?raw'

// Shaped like the three.js webgpu_tsl_vfx_tornado example (bright streaks under a
// wider black shell), shaded like the curtains in AvernusEnergy.vue.

const props = defineProps<{
  nodes: Record<string, any>
}>()

const UUID = 'portals-rpg-difficulty'

// Captured values are linear already, see AvernusEnergy.vue.
const linear = (r: number, g: number, b: number) => new Color().setRGB(r, g, b, LinearSRGBColorSpace)

// Shared `{ value }` objects: one slider drives both layers.
const shared = {
  uRadiusHeart: { value: 0 },
  uRadiusKnight: { value: 0.45 },
  uTurbulence: { value: 0.2 },
  uTurbulenceFreq: { value: 20 },
  // Positive flows chest to heart (the shaders negate time), so the knight reads as drained.
  uTimeScale: { value: 0.08 },
  uOpacity: { value: 0.2 },
  uEdge: { value: 0.1 },
  uSkew: { value: -0.45 },
  uStreakScale: { value: 5 },
  uDarkOpacity: { value: 0.6 },
  uRimGain: { value: 1 },
  uCoreDark: { value: 1.5 },
  uTime: { value: 0 },
  uPalette0: { value: linear(0.800007463, 0.00279104151, 0.026096642) },
  uPalette1: { value: linear(0.300010771, 0.000417422998, 0.00549431844) },
  uPalette2: { value: linear(0.0250004753, 0.0000500666174, 0.00118516071) },
  uPalette3: { value: linear(0.0271967836, 0.000134123649, 0) },
}

const darkOffset = { value: 0.04 }

function makeMaterial(dark: boolean) {
  const material = new CustomShaderMaterial({
    baseMaterial: MeshStandardMaterial,
    vertexShader: beamVertex,
    fragmentShader: blenderNoise + avernusFields + beamFragment,
    uniforms: {
      ...shared,
      uRadiusOffset: dark ? darkOffset : { value: 0 },
      uSeed: { value: dark ? 123.4 : 0 },
      uDark: { value: dark ? 1 : 0 },
    },
    transparent: true,
    // Depth writes on: the shell's ribbons hide the bright ones behind them, which makes the beam read as woven.
    depthWrite: true,
    depthTest: true,
    side: DoubleSide,
    blending: NormalBlending,
    premultipliedAlpha: false,
    metalness: 0,
    roughness: 0.9,
  })
  material.name = dark ? 'AvernusBeamDark' : 'AvernusBeamBright'
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
  radiusHeart: { value: shared.uRadiusHeart.value, min: 0, max: 1, step: 0.01, label: 'radius heart' },
  radiusKnight: { value: shared.uRadiusKnight.value, min: 0, max: 1.5, step: 0.01, label: 'radius knight' },
  darkOffset: { value: darkOffset.value, min: 0, max: 0.2, step: 0.005, label: 'dark shell offset' },
  turbulence: { value: shared.uTurbulence.value, min: 0, max: 0.6, step: 0.01 },
  turbulenceFreq: { value: shared.uTurbulenceFreq.value, min: 0, max: 40, step: 0.5, label: 'turbulence freq' },
  speed: { value: shared.uTimeScale.value, min: -1, max: 1, step: 0.01 },
  skew: { value: shared.uSkew.value, min: -3, max: 3, step: 0.05 },
  streakScale: { value: shared.uStreakScale.value, min: 0.25, max: 12, step: 0.05, label: 'streak scale' },
  darkOpacity: { value: shared.uDarkOpacity.value, min: 0, max: 1, step: 0.05, label: 'dark shell opacity' },
  edge: { value: shared.uEdge.value, min: 0.001, max: 0.5, step: 0.001 },
  rim: { value: shared.uRimGain.value, min: 0, max: 4, step: 0.05 },
  coreDark: { value: shared.uCoreDark.value, min: 0, max: 8, step: 0.1, label: 'core darkness' },
  opacity: { value: shared.uOpacity.value, min: 0, max: 1, step: 0.05 },
}, { uuid: UUID })

watch(beamRadiusHeart, v => shared.uRadiusHeart.value = v)
watch(beamRadiusKnight, v => shared.uRadiusKnight.value = v)
watch(beamDarkOffset, v => darkOffset.value = v)
watch(beamTurbulence, v => shared.uTurbulence.value = v)
watch(beamTurbulenceFreq, v => shared.uTurbulenceFreq.value = v)
watch(beamSpeed, v => shared.uTimeScale.value = v)
watch(beamSkew, v => shared.uSkew.value = v)
watch(beamStreakScale, v => shared.uStreakScale.value = v)
watch(beamEdge, v => shared.uEdge.value = v)
watch(beamRim, v => shared.uRimGain.value = v)
watch(beamCoreDark, v => shared.uCoreDark.value = v)
watch(beamDarkOpacity, v => shared.uDarkOpacity.value = v)
watch(beamOpacity, v => shared.uOpacity.value = v)

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  shared.uTime.value = elapsed

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
