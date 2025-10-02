<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, UseSVG } from '@tresjs/cientos'
import { onMounted, onUnmounted, shallowRef } from 'vue'

// SVG data for demo
const svgTriangleString = `<svg width="404" height="80" viewBox="0 0 404 80" fill="none" 
xmlns="http://www.w3.org/2000/svg">
<path d="M44.5703 5.71662C46.124 3.12726 49.8767 3.12726 51.4303 5.71662L92.3655 73.942C93.9652 
76.6081 92.0447 80 88.9355 80H7.06507C3.95589 80 2.03544 76.6081 3.6351 73.942L44.5703 5.71662Z" 
fill="rgb(130,219,197)" stroke="rgb(130,219,197)" />
</svg>`

const svgSquareString = `<svg width="404" height="80" viewBox="0 0 404 80" 
fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="172" y="2.64999" width="74.7" height="74.7" rx="4" fill="rgb(79,79,79)" stroke="rgb(79,79,79)" />
</svg>`

const svgHeartURL = '/cientos.svg'

// Animation state for the demo
const skipFillsA = shallowRef(false)
const skipFillsB = shallowRef(true)
const skipFillsC = shallowRef(false)

let animationId: number
let cooldown = 0

/**
 * Animation loop that cycles through different skip-fills states
 * to demonstrate the reactivity of the SVG component
 */
const animate = (deltaTime: number) => {
  cooldown -= deltaTime

  while (cooldown <= 0) {
    // Cycle through different states
    const skipFillsTmp = skipFillsA.value
    skipFillsA.value = skipFillsC.value
    skipFillsC.value = skipFillsB.value
    skipFillsB.value = skipFillsTmp
    cooldown += 1000 // 1 second interval
  }

  animationId = requestAnimationFrame(_time => animate(16.67)) // ~60fps
}

onMounted(() => {
  animate(0)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <TresCanvas
    clear-color="#333"
    render-mode="on-demand"
  >
    <TresPerspectiveCamera :position="[0, 2, 10]" />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />

    <TresGroup
      :scale="0.01"
      :position="[1, 1, 0]"
    >
      <!-- Triangle SVG with animated skip-fills -->

      <UseSVG
        :src="svgTriangleString"
        :skip-fills="skipFillsA"
        :position="[-200, 0, 0]"
        :fill-material="{ transparent: true, opacity: 0.8 }"
      />

      <!-- Square SVG with animated skip-fills -->

      <UseSVG
        :src="svgSquareString"
        :skip-fills="skipFillsB"
        :position="[0, 200, 0]"
        :stroke-material="{ transparent: true, opacity: 0.9 }"
      />

      <!-- Heart SVG from URL with animated skip-fills -->

      <UseSVG
        :src="svgHeartURL"
        :skip-fills="skipFillsC"
        :position="[200, -4, 0]"
        :fill-material="{ color: '#ff6b6b', transparent: true, opacity: 0.7 }"
        depth="offsetZ"
      />

      <!-- Duplicate heart to show multiple instances -->

      <UseSVG
        :src="svgHeartURL"
        :skip-fills="skipFillsC"
        :position="[200, -80, 0]"
        :fill-material="{ color: '#4ecdc4', transparent: true, opacity: 0.7 }"
        depth="renderOrder"
      />
    </TresGroup>
  </TresCanvas>
</template>
