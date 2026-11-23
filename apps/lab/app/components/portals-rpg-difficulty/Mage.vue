<script setup lang="ts">
import type { Material, Mesh, PointLight } from 'three/webgpu'
import { Color, IcosahedronGeometry, Vector2, Vector3 } from 'three/webgpu'
import { useAnimations } from '@tresjs/cientos/webgpu'
import { marble } from './marble'
import { createFireMaterial } from './tsl/fireMaterial'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

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

const { material: orbMaterial, uniforms } = createFireMaterial({
  coreOffset: 0.9,
  coreScale: 0.6,
  coreMidPos: 0.4,
  coreStrength: 1.4,
  coreLow: new Color('#0a46e0'),
  coreMid: new Color('#0ac8ff'),
  coreHigh: new Color('#d8fbff'),
  rimStops: new Vector2(0.0, 0.523),
  rimOffset: 1.0,
  rimScale: 1.0,
  rimStrength: 1.0,
  rimLow: new Color('#1ea8ff'),
  rimHigh: new Color('#0b1e9e'),
  maskFloor: 1.0,
  powerA: 2.0,
  powerB: 4.0,
  rampA: new Vector2(0.0, 1.0),
  rampB: new Vector2(0.082, 1.0),
  animator,
  marbleSize: MARBLE_SIZE,
  marbleTurbulence: 5.0,
  marbleVeins: MARBLE_VEINS,
  displaceStrength: DISPLACE_STRENGTH,
  displaceMid: 0.5,
  baseMask: 0,
  flicker: 0.06,
})

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
  uniforms.heightMin.value = bounds.min.y
  uniforms.heightRange.value = bounds.max.y - bounds.min.y
  uniforms.marbleSize.value = MARBLE_SIZE * r
  uniforms.marbleVeins.value = MARBLE_VEINS / r
  uniforms.displaceStrength.value = DISPLACE_STRENGTH * r
}

let originalMaterial: Material | Material[] | null = null

// immediate: Balanced.vue gates the group on loaded nodes, so a plain watch never fires.
watch(orb, (mesh) => {
  if (!mesh?.geometry) { return }
  prepareOrb(mesh)
  // useGLTF caches the scene between portal mounts, so the GLB material comes back on unmount.
  originalMaterial ??= mesh.material
  mesh.material = orbMaterial
}, { immediate: true })

onUnmounted(() => {
  if (orb.value && originalMaterial) { orb.value.material = originalMaterial }
  orbMaterial.dispose()
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  animator.y = elapsed * RISE_SPEED * radius
  animator.x = Math.sin(elapsed * 2.6) * SWAY * radius
  animator.z = Math.cos(elapsed * 1.8) * SWAY * radius

  let sum = 0
  for (const t of LIGHT_SAMPLES) {
    sum += marble(
      orbCenter.x - animator.x,
      uniforms.heightMin.value + t * uniforms.heightRange.value - animator.y,
      orbCenter.z - animator.z,
      uniforms.marbleVeins.value,
      uniforms.marbleSize.value,
      uniforms.marbleTurbulence.value,
    )
  }
  const swell = sum / LIGHT_SAMPLES.length

  if (!orbLight.value) { return }
  orbLight.value.intensity = lightRest.intensity + (swell - LIGHT_SWELL_MID) * LIGHT_SWING
})
</script>

<template>
  <primitive name="Mage orb" :object="nodes.Mage_Orb">
    <!-- Parented to the orb so it rides the GLTF transform. -->
    <TresPointLight ref="orbLight" :position="lightPosition" :intensity="3" :distance="6" color="#0ac8ff" />
  </primitive>
  <primitive name="Mage" :object="mage" />
</template>
