<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { onMounted, onUnmounted, ref } from 'vue'

const wave = ref(0)
const uuid = 'graph-demo'

useControls({
  sine: {
    type: 'graph',
    label: 'Sine Wave',
    value: wave,
  },
}, {
  uuid,
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
</script>

<template>
  <div class="w-full h-300px bg-gray-200 dark:bg-dark-800 mb-8 relative flex justify-center items-center">
    <TresLeches
      :uuid="uuid"
    />
    {{ wave }}
  </div>
</template>
