<script setup lang="ts">
import noise from './shaders/noise.glsl?raw'
import orbDisplace from './shaders/orb-displace.glsl?raw'
import type { Mesh, MeshStandardMaterial } from 'three'
import { IcosahedronGeometry, Uniform, Vector3 } from 'three'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const mage = computed(() => props.nodes.Rig_Mage)
const orb = computed<Mesh | undefined>(() => props.nodes.Mage_Orb)

const { actions } = useAnimations(props.state.animations, mage.value)

const currentAction = actions.Mage_Pose
currentAction?.play()

// The GLTF orb is an 80-face flat-shaded icosphere; displacing that reads as
// the whole ball jittering. Faces = 20 * (detail + 1)^2, so 7 gives 1280,
// enough for the noise to roll across the surface as blobs.
const ORB_DETAIL = 7

// Two beats that never line up, so the pulse does not read as a metronome.
const PULSE = [
  { amplitude: 0.06, frequency: 1.5 },
  { amplitude: 0.02, frequency: 0.4 },
]
// How much of the scale pulse the glow follows. Bloom keys on this emitter, so
// the halo swells on the same beat as the surface.
const GLOW_FOLLOW = 3

// The surface only churns, it must not read as a different shape, so the
// amplitude stays well under the scale pulse.
const DISPLACE_AMPLITUDE = 0.12
const DISPLACE_CELLS = 2.5
const DISPLACE_SPEED = 0.35
// Emissive gain per unit of displacement. turbulence() - 0.5 spans about
// -0.3..0.3, so 2 swings the glow roughly 40 percent either way.
const DISPLACE_GLOW = 2.0

const uniforms = {
  uOrbTime: new Uniform(0),
  uOrbAmplitude: new Uniform(0),
  uOrbFrequency: new Uniform(1),
  uOrbSpeed: new Uniform(DISPLACE_SPEED),
  uOrbEps: new Uniform(0.01),
  uOrbGlow: new Uniform(DISPLACE_GLOW),
}

const orbRest = { scale: new Vector3(1, 1, 1), emissiveIntensity: 1 }
let orbMaterial: MeshStandardMaterial | null = null

const patchOrb = (mesh: Mesh) => {
  // useGLTF caches the scene, so a remount would otherwise rebuild and re-clone.
  if (mesh.userData.orbPatched) { return }
  mesh.userData.orbPatched = true

  mesh.geometry.computeBoundingSphere()
  const { radius, center } = mesh.geometry.boundingSphere!
  mesh.geometry.dispose()
  mesh.geometry = new IcosahedronGeometry(radius, ORB_DETAIL).translate(center.x, center.y, center.z)

  uniforms.uOrbAmplitude.value = radius * DISPLACE_AMPLITUDE
  uniforms.uOrbFrequency.value = DISPLACE_CELLS / radius
  uniforms.uOrbEps.value = radius * 0.02

  // The glow material is shared with the skeletons' eyes; patching it in place
  // would make every eye churn too.
  const material = (mesh.material as MeshStandardMaterial).clone()
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${noise}\n${orbDisplace}`)
      .replace('#include <beginnormal_vertex>', `
        vec3 orbDisplaced;
        vec3 objectNormal;
        orbWarp(orbDisplaced, objectNormal);
        #ifdef USE_TANGENT
          vec3 objectTangent = vec3(tangent.xyz);
        #endif`)
      .replace('#include <begin_vertex>', 'vec3 transformed = orbDisplaced;')
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uOrbGlow;\nvarying float vOrbAmount;')
      // Bulges glow brighter and dips darker, so the noise reads as energy
      // moving under the surface instead of a flat disc with a wobbly edge.
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance *= max(0.0, 1.0 + vOrbAmount * uOrbGlow);`)
  }
  material.needsUpdate = true
  mesh.material = material

  orbMaterial = material
  orbRest.scale.copy(mesh.scale)
  orbRest.emissiveIntensity = material.emissiveIntensity
}

// immediate: nodes are already loaded when this mounts, because Balanced.vue
// gates the group on the floors, so a plain watch would never fire.
watch(orb, (mesh) => {
  if (mesh?.geometry) { patchOrb(mesh) }
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.uOrbTime.value = elapsed

  const mesh = orb.value
  if (!mesh || !orbMaterial) { return }

  let pulse = 0
  for (const { amplitude, frequency } of PULSE) {
    pulse += amplitude * Math.sin(elapsed * frequency * Math.PI * 2)
  }
  mesh.scale.copy(orbRest.scale).multiplyScalar(1 + pulse)
  orbMaterial.emissiveIntensity = orbRest.emissiveIntensity * (1 + pulse * GLOW_FOLLOW)
})
</script>

<template>
  <primitive name="Mage orb" :object="nodes.Mage_Orb" />
  <primitive name="Mage" :object="mage" />
</template>
