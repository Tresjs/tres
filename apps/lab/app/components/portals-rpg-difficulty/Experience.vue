<script setup lang="ts">
import { Html } from '@tresjs/cientos'
import { ref } from 'vue'
import Card from './Card.vue'
import Easy from './Easy.vue'
import Balanced from './Balanced.vue'
import { EquirectangularReflectionMapping, MathUtils, SRGBColorSpace } from 'three'

const { scene: mainScene } = useTresContext()

// Degrees of yaw applied to the sky, to put the part of the panorama you want
// behind the frames.
const SKY_YAW = 90

const { state: background } = useTexture('/skyboxes/medieval-bg.png')

watch(() => background.value, (value) => {
  if (value) {
    value.mapping = EquirectangularReflectionMapping
    value.colorSpace = SRGBColorSpace
    mainScene.value.background = value
    mainScene.value.environment = value
    // mainScene.value.backgroundBlurriness = 0.01
    mainScene.value.backgroundRotation.y = MathUtils.degToRad(SKY_YAW)
    mainScene.value.environmentRotation.y = MathUtils.degToRad(SKY_YAW)
    mainScene.value.backgroundIntensity = 0.2
  }
}, { immediate: true })

// Side frames are angled inward and pushed forward in z (z = sin θ) so the three
// planes read as one folded panel: inner edge at x = ±(1 + gap).
const difficulties = [
  { label: 'Explorer', description: 'A narrative experience placing story before combat', x: -2.321, z: 0.389, rotationY: 0.4, component: Easy },
  { label: 'Balanced', description: 'A balanced adventure full of challenging rewards', x: 0, z: 0, rotationY: 0, component: Balanced },
  { label: 'Tactician', description: 'A tough campaign with strategic depth', x: 2.321, z: 0.389, rotationY: -0.4 },
]

// null = every portal stays a window. Only one portal may blend at a time: the
// blend pass takes over the whole screen, so two at once fight for it.
const focused = ref<string | null>(null)

function toggle(label: string) {
  focused.value = focused.value === label ? null : label
}
// TODO: ease `blend` instead of snapping, and fly the camera into the frame.
</script>

<template>
  <TresMesh
    v-for="d in difficulties"
    :key="d.label"
    :position="[d.x, 0, d.z]"
    :rotation="[0, d.rotationY, 0]"
    @click="toggle(d.label)"
  >
    <TresPlaneGeometry :args="[2, 3]" />

    <MeshPortalMaterial :blend="focused === d.label ? 1 : 0" :resolution="2048">
      <component :is="d.component" v-if="d.component" />
    </MeshPortalMaterial>
    <!-- Child of the frame, so the card folds with the angled side panels.
         distance-factor 4 makes one world unit 100 CSS px, so the card's
         200 x 300 px window lands exactly on this 2 x 3 plane. -->
    <Html
      center
      transform
      pointer-events="none"
      :distance-factor="4"
      :position="[0, 0, 0.02]"
    >
      <Card :label="d.label" :description="d.description" :faded="focused !== null" />
    </Html>
  </TresMesh>
  <!-- <Easy /> -->
</template>
