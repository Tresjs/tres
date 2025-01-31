<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const toggleMax = 1000
const numObjectsMax = 2000
const startTimeMS = Date.now()

const toggleCount = ref(0)
const show = ref(false)
const msg = ref('Test is running.')
const r = ref(null)
const isPaused = ref(true)

let intervalId: ReturnType<typeof setInterval>

const startInterval = () => {
  intervalId = setInterval(() => {
    if (toggleCount.value < toggleMax) {
      // NOTE: Make sure that objects are mounted by
      // checking `!!r.value`.
      if (r.value) {
        show.value = false
        toggleCount.value++
      }
      else {
        show.value = true
      }
    }
    else {
      clearInterval(intervalId)
      const elapsedSec = (Date.now() - startTimeMS) / 1000
      msg.value = `Test completed in ${elapsedSec} seconds.`
    }
  }, 1000 / 120)
}

const togglePause = () => {
  isPaused.value = !isPaused.value
  if (!isPaused.value) {
    startInterval()
  }
  else {
    clearInterval(intervalId)
  }
}

onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <OverlayInfo>
    <h1>Memory test: Tres Objects</h1>
    <h2>Setup</h2>
    <p>This page will successively create and remove a TresCanvas containing a number of objects.</p>
    <h2>Status</h2>
    <p>{{ msg }}</p>
    <p>Number of TresCanvases created: {{ toggleCount }} / {{ toggleMax }}</p>
    <p>Number of Objects per TresCanvas: {{ numObjectsMax }}</p>
    <button style="padding: 8px 16px; margin-top: 10px;" @click="togglePause">
      {{ isPaused ? 'Start Test' : 'Pause Test' }}
    </button>
  </OverlayInfo>
  <div v-if="show" style="width: 90%; height: 90%; border: 1px solid #F00">
    <TresCanvas clear-color="black">
      <TresGroup ref="r" />
      <TresMesh v-for="_, i of Array.from({ length: numObjectsMax })" :key="i">
        <TresMeshBasicMaterial />
        <TresBoxGeometry />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
