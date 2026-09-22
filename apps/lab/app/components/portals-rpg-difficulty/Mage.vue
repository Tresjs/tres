<script setup lang="ts">
import noise from './shaders/noise.glsl?raw'
import fireVertex from './shaders/fire-vertex.glsl?raw'
import fragmentShader from './shaders/fire-fragment.glsl?raw'
import type { Mesh, PointLight } from 'three'
import { Color, DoubleSide, IcosahedronGeometry, Uniform, Vector2, Vector3 } from 'three'
import { marble } from './marble'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const vertexShader = noise + fireVertex

const mage = computed(() => props.nodes.Rig_Mage)
const orb = computed<Mesh | undefined>(() => props.nodes.Mage_Orb)

const { actions } = useAnimations(props.state.animations, mage.value)

const currentAction = actions.Mage_Pose
currentAction?.play()

// The GLTF orb is an 80-face icosphere and jitters when displaced.
// Faces = 20 * (detail + 1)^2, so 7 gives 1280.
const ORB_DETAIL = 7

// Fractions of the orb radius, so the look survives a model rescale.
const RISE_SPEED = 1.2
const SWAY = 0.12
const MARBLE_SIZE = 0.5
const MARBLE_VEINS = 2.5
const DISPLACE_STRENGTH = 0.22

const LIGHT_SAMPLES = [0.3, 0.55, 0.78, 0.95]
const LIGHT_SWELL_MID = 0.53
const LIGHT_SWING = 2

const animator = new Vector3()
const swell = new Uniform(0)

const uniforms = {
  uCoreOffset: new Uniform(0.9),
  uCoreScale: new Uniform(0.6),
  uCoreMidPos: new Uniform(0.4),
  uCoreStrength: new Uniform(1.4),
  uCoreLow: new Uniform(new Color('#0a46e0')),
  uCoreMid: new Uniform(new Color('#0ac8ff')),
  uCoreHigh: new Uniform(new Color('#d8fbff')),

  uRimStops: new Uniform(new Vector2(0.0, 0.523)),
  uRimOffset: new Uniform(1.0),
  uRimScale: new Uniform(1.0),
  uRimStrength: new Uniform(1.0),
  uRimLow: new Uniform(new Color('#1ea8ff')),
  uRimHigh: new Uniform(new Color('#0b1e9e')),

  uHeightMin: new Uniform(0),
  uHeightRange: new Uniform(1),

  uMaskFloor: new Uniform(1.0),
  uPowerA: new Uniform(2.0),
  uPowerB: new Uniform(4.0),
  uRampA: new Uniform(new Vector2(0.0, 1.0)),
  uRampB: new Uniform(new Vector2(0.082, 1.0)),

  uAnimator: new Uniform(animator),
  uMarbleSize: new Uniform(MARBLE_SIZE),
  uMarbleTurbulence: new Uniform(5.0),
  uMarbleVeins: new Uniform(MARBLE_VEINS),
  uDisplaceStrength: new Uniform(DISPLACE_STRENGTH),
  uDisplaceMid: new Uniform(0.5),
  uBaseMask: new Uniform(0),

  uTime: new Uniform(0),
  uFlicker: new Uniform(0.06),
}

let radius = 1
const orbCenter = new Vector3()
const lightPosition = computed(() => orbCenter.toArray() as [number, number, number])

const orbLight = shallowRef<PointLight | null>(null)
const lightRest = { intensity: 1 }

watch(orbLight, (light) => {
  if (light) { lightRest.intensity = light.intensity }
})

const prepareOrb = (mesh: Mesh) => {
  // useGLTF caches the scene, so a remount would otherwise rebuild the geometry.
  if (mesh.userData.orbPrepared) { return }
  mesh.userData.orbPrepared = true

  mesh.geometry.computeBoundingSphere()
  const { radius: r, center } = mesh.geometry.boundingSphere!
  mesh.geometry.dispose()
  mesh.geometry = new IcosahedronGeometry(r, ORB_DETAIL).translate(center.x, center.y, center.z)
  mesh.geometry.computeBoundingBox()

  radius = r
  orbCenter.copy(center)
  const bounds = mesh.geometry.boundingBox!
  uniforms.uHeightMin.value = bounds.min.y
  uniforms.uHeightRange.value = bounds.max.y - bounds.min.y
  uniforms.uMarbleSize.value = MARBLE_SIZE * r
  uniforms.uMarbleVeins.value = MARBLE_VEINS / r
  uniforms.uDisplaceStrength.value = DISPLACE_STRENGTH * r
}

// immediate: Balanced.vue gates the group on loaded nodes, so a plain watch never fires.
watch(orb, (mesh) => {
  if (mesh?.geometry) { prepareOrb(mesh) }
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  animator.y = elapsed * RISE_SPEED * radius
  animator.x = Math.sin(elapsed * 2.6) * SWAY * radius
  animator.z = Math.cos(elapsed * 1.8) * SWAY * radius
  uniforms.uTime.value = elapsed

  let sum = 0
  for (const t of LIGHT_SAMPLES) {
    sum += marble(
      orbCenter.x - animator.x,
      uniforms.uHeightMin.value + t * uniforms.uHeightRange.value - animator.y,
      orbCenter.z - animator.z,
      uniforms.uMarbleVeins.value,
      uniforms.uMarbleSize.value,
      uniforms.uMarbleTurbulence.value,
    )
  }
  swell.value = sum / LIGHT_SAMPLES.length

  if (!orbLight.value) { return }
  orbLight.value.intensity = lightRest.intensity + (swell.value - LIGHT_SWELL_MID) * LIGHT_SWING
})
</script>

<template>
  <primitive name="Mage orb" :object="nodes.Mage_Orb">
    <TresShaderMaterial
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="uniforms"
      :side="DoubleSide"
    />
    <!-- Parented to the orb so it rides the GLTF transform. -->
    <TresPointLight ref="orbLight" :position="lightPosition" :intensity="3" :distance="6" color="#0ac8ff" />
  </primitive>
  <primitive name="Mage" :object="mage" />
</template>
