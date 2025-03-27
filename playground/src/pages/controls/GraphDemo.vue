<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { onMounted, onUnmounted, ref } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'

const renderTimes = ref(0)

/* useControls({
  renderTimes: {
    value: renderTimes,
    type: 'graph',
    label: 'Render Times (ms)',
    onUpdate: () => {
      renderTimes.value = 0
    },
  },
}) */

const wave = ref(0)

useControls({
  sine: {
    type: 'graph',
    label: 'Sine Wave',
    value: wave,
  },
})

// Parameters for the sine wave
const amplitude = 50 // Height of the wave
const frequency = 2 // Speed of the wave (increased from 0.1)
let time = 0
let intervalId: number | null = null

// Function to update the sine wave value
function updateSineWave() {
  // Calculate sine value based on time
  wave.value = amplitude * Math.sin(time * frequency)
  time += 0.1
}

onMounted(() => {
  // Start the sine wave animation
  intervalId = setInterval(updateSineWave, 100) as unknown as number
})

onUnmounted(() => {
  // Clean up interval when component is destroyed
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})

function onRender() {
  renderTimes.value = 1
}

/* setInterval(() => {
  renderTimes.value++
}, 100) */
</script>

<template>
  <TresLeches />
  <TresCanvas render-mode="on-demand" @render="onRender">
    <TresPerspectiveCamera
      :position="[4, 4, 4]"
    />
    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.3, 128, 32]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <OrbitControls />
  </TresCanvas>
</template>
