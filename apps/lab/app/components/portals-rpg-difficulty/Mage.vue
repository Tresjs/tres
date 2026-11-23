<script setup lang="ts">
import type { Mesh, PointLight } from 'three/webgpu'
import { Color, IcosahedronGeometry, Vector3 } from 'three/webgpu'
import { useAnimations } from '@tresjs/cientos/webgpu'
import { marble } from './marble'
import { createFireMaterial } from './tsl/fireMaterial'
import { useMaterialSwap } from './useMaterialSwap'

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
  coreLow: new Color('#0a46e0'),
  coreMid: new Color('#0ac8ff'),
  coreHigh: new Color('#d8fbff'),
  rimLow: new Color('#1ea8ff'),
  rimHigh: new Color('#0b1e9e'),
  animator,
  marbleSize: MARBLE_SIZE,
  marbleVeins: MARBLE_VEINS,
  displaceStrength: DISPLACE_STRENGTH,
  baseMask: 0,
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

// immediate: Balanced.vue gates the group on loaded nodes, so a plain watch never fires.
watch(orb, (mesh) => {
  if (mesh?.geometry) { prepareOrb(mesh) }
}, { immediate: true })

useMaterialSwap(orb, orbMaterial)

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
