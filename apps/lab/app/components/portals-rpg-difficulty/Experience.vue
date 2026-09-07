<script setup lang="ts">
import { ref } from 'vue'
import Easy from './Easy.vue'

// Side frames are angled inward and pushed forward in z (z = sin θ) so the three
// planes read as one folded panel: inner edge at x = ±(1 + gap).
const difficulties = [
  { label: 'easy', x: -2.321, z: 0.389, rotationY: 0.4, color: '#6ee7b7', component: Easy },
  { label: 'normal', x: 0, z: 0, rotationY: 0, color: '#7db4ff' },
  { label: 'hard', x: 2.321, z: 0.389, rotationY: -0.4, color: '#ff6b9d' },
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
  <!-- <TresMesh v-for="d in difficulties" :key="d.label" :position="[d.x, 0, d.z]" :rotation="[0, d.rotationY, 0]"
    @click="toggle(d.label)">
    <TresPlaneGeometry :args="[2, 3]" />

    <MeshPortalMaterial :blend="focused === d.label ? 1 : 0" :resolution="1024">
      <component :is="d.component" v-if="d.component" />
    </MeshPortalMaterial>
  </TresMesh> -->
  <Easy />
</template>
