<script setup lang="ts">
import type { Box3, PointLight } from 'three/webgpu'
import { Color, Vector3 } from 'three/webgpu'
import { uniform } from 'three/tsl'
import { marble } from './marble'
import { createFireMaterial } from './tsl/fireMaterial'
import { useMaterialSwap } from './useMaterialSwap'

const props = defineProps<{
  nodes: Record<string, any>
}>()

const fireplace = computed(() => props.nodes.Fireplace)
const fire = computed(() => props.nodes.Fire)

// Stand-in for Blender's "Fire Animator" empty: moving it scrolls the marble veins through the mesh.
const animator = new Vector3()
const RISE_SPEED = 0.7
const SWAY = 0.08

// One sample strobes (full 0..1 swing at up to 7 units/s); averaging four spreads them
// over half a vein cycle, so the light reads as the flame swelling.
const LIGHT_SAMPLES = [0.3, 0.55, 0.78, 0.95]
const LIGHT_SWELL_MID = 0.53
const LIGHT_SWING = 6

// Shared with Sparks.vue so a flare reaches both on the same frame. A uniform node, not a
// ref: a per-frame reactive write would re-render the tree for nothing.
const swell = uniform(0)

const { material: fireMaterial, uniforms } = createFireMaterial({
  coreOffset: 0.8,
  coreScale: 0.54,
  coreMidPos: 0.327,
  coreLow: new Color('#ff4d00'),
  coreMid: new Color('#ff9d2e'),
  coreHigh: new Color('#ffe6a8'),
  rimLow: new Color('#ff6a1a'),
  rimHigh: new Color('#d81400'),
  animator,
  marbleSize: 0.4,
  marbleVeins: 5.0,
  displaceStrength: 0.12,
  baseMask: 0.18,
})

// shallowRef: a plain ref() wraps the light in a proxy that every matrix write pays for.
const fireLight = shallowRef<PointLight | null>(null)
const flameCenter = new Vector3()
const flameBounds = shallowRef<Box3 | null>(null)
// Notes rise from the flame tip, not the lute, so the whole camp reads as singing along.
const notesOrigin = computed(() => flameBounds.value
  ? [flameCenter.x, flameBounds.value.max.y, flameCenter.z]
  : [0, 0, 0])
const lightRest = { intensity: 1, position: new Vector3() }

watch(fireLight, (light) => {
  if (!light) { return }
  lightRest.intensity = light.intensity
  lightRest.position.copy(light.position)
})

useMaterialSwap(fire, fireMaterial)

// immediate: Easy.vue gates this on nodes.Ground, so nodes are loaded before mount.
watch(fire, () => {
  if (fire.value?.geometry) {
    fire.value.geometry.computeBoundingBox()
    const bounds = fire.value.geometry.boundingBox!
    uniforms.heightMin.value = bounds.min.y
    uniforms.heightRange.value = bounds.max.y - bounds.min.y
    bounds.getCenter(flameCenter)
    flameBounds.value = bounds
  }
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  animator.y = elapsed * RISE_SPEED
  animator.x = Math.sin(elapsed * 2.6) * SWAY
  animator.z = Math.cos(elapsed * 1.8) * SWAY

  // Same field and offset as the vertex shader, so light and sparks peak with the flame.
  let sum = 0
  for (const t of LIGHT_SAMPLES) {
    sum += marble(
      flameCenter.x - animator.x,
      uniforms.heightMin.value + t * uniforms.heightRange.value - animator.y,
      flameCenter.z - animator.z,
      uniforms.marbleVeins.value,
      uniforms.marbleSize.value,
      uniforms.marbleTurbulence.value,
    )
  }
  swell.value = sum / LIGHT_SAMPLES.length

  if (!fireLight.value) { return }

  fireLight.value.intensity = lightRest.intensity + (swell.value - LIGHT_SWELL_MID) * LIGHT_SWING
  fireLight.value.position.set(
    lightRest.position.x + animator.x,
    lightRest.position.y,
    lightRest.position.z + animator.z,
  )
})
</script>

<template>
  <TresGroup name="Fireplace">
    <TresPointLight ref="fireLight" :position="[0, 0, 0]" :intensity="10" color="#ff9d2e" />
    <primitive name="Fireplace" :object="fireplace" />
    <primitive name="Fire" :object="fire">
      <!-- Child of the flame mesh, so the sparks inherit its GLTF transform. -->
      <PortalsRpgDifficultySparks v-if="flameBounds"
                                  :bounds="flameBounds"
                                  :animator="animator"
                                  :swell="swell"
                                  :sway-amplitude="SWAY"
      />
    </primitive>
    <PortalsRpgDifficultyNotes v-if="flameBounds" :position="notesOrigin" />
  </TresGroup>
</template>
