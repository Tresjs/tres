<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { onUnmounted, ref } from 'vue'

const toggleMax = 400
const numObjectsMax = 2000
const startTimeMS = ref(0)

const toggleCount = ref(0)
const show = ref(false)
const msg = ref('Click Start Test to begin.')
const r = ref(null)
const isStarted = ref(false)

let rafId: number

const startTest = () => {
  isStarted.value = true
  startTimeMS.value = Date.now()
  msg.value = 'Test is running...'
  show.value = true // Start by showing the canvas

  const tick = () => {
    if (toggleCount.value < toggleMax) {
      if (r.value && show.value) {
        show.value = false
        toggleCount.value++
      }
      else if (!show.value) {
        show.value = true
      }
      rafId = requestAnimationFrame(tick)
    }
    else {
      const elapsedSec = (Date.now() - startTimeMS.value) / 1000
      msg.value = `Test completed in ${elapsedSec} seconds.`
    }
  }

  rafId = requestAnimationFrame(tick)
}

onUnmounted(() => {
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<template>
  <OverlayInfo>
    <h1>Memory test: Tres Objects</h1>
    <h2>Setup</h2>
    <p>This test will create and remove {{ toggleMax }} TresCanvas instances with {{ numObjectsMax }} objects each.</p>
    <h2>Status</h2>
    <p>{{ msg }}</p>
    <p>Number of TresCanvases created: {{ toggleCount }} / {{ toggleMax }}</p>
    <button
      v-if="!isStarted"
      style="padding: 8px 16px; margin-top: 10px;"
      @click="startTest"
    >
      Start Test
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
