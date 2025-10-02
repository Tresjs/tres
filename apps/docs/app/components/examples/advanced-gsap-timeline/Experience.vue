<script setup lang="ts">
import { onMounted, shallowRef, watch } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import gsap from 'gsap'
import type { TresObject } from '@tresjs/core'

const groupRef = shallowRef<TresObject>()
const timeline = gsap.timeline({ paused: true })

// Create array of positions for multiple objects
const positions: [number, number, number][] = [
  [-3, 0.5, 0],
  [-1, 0.5, 0],
  [1, 0.5, 0],
  [3, 0.5, 0],
]

watch(groupRef, () => {
  if (!groupRef.value) { return }

  const children = Array.from(groupRef.value.children) as TresObject[]

  // Clear existing timeline
  timeline.clear()

  // Add multiple animations to timeline
  timeline
    .to(children.map(child => child.position), {
      y: 3,
      duration: 1,
      ease: 'back.out(1.7)',
      stagger: 0.1,
    })
    .to(children.map(child => child.rotation), {
      y: Math.PI * 2,
      duration: 2,
      ease: 'power2.inOut',
      stagger: 0.1,
    }, '-=0.5') // Start 0.5s before previous animation ends
    .to(children.map(child => child.scale), {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
      stagger: 0.05,
    })
    .to(children.map(child => child.position), {
      y: 0.5,
      duration: 1,
      ease: 'bounce.out',
      stagger: 0.1,
    })
    .to(children.map(child => child.scale), {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.05,
    }, '-=0.8')
})

// Auto-play the timeline on mount
onMounted(() => {
  setTimeout(() => {
    if (timeline) {
      timeline.play()
      // Restart timeline when it completes
      timeline.repeat(-1).yoyo(false)
    }
  }, 500) // Small delay to ensure refs are ready
})
</script>

<template>
  <TresPerspectiveCamera :position="[-8, 6, 8]" />
  <OrbitControls />
  <TresGroup ref="groupRef">
    <TresMesh v-for="(pos, i) of positions" :key="i" :position="pos">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresGroup>
  <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
</template>
