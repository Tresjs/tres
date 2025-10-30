<script lang="ts" setup>
import { shallowRef, watch } from 'vue'
import { useOverlay } from '#imports' // Nuxt UI composable for overlays
import { usePermission, useUserMedia } from '@vueuse/core' // VueUse composables
import BlobPermissionModal from './BlobPermissionModal.vue'
import { TresLeches } from '@tresjs/leches'

// Audio analysis state
const analyser = shallowRef<AnalyserNode | null>(null)
const dataArray = shallowRef<Uint8Array | null>(null)

// Use VueUse to reactively check microphone permission
const micPermission = usePermission('microphone')

// Use VueUse's useUserMedia for microphone stream
const { stream, start, stop } = useUserMedia({ constraints: { audio: true } })

// Nuxt UI overlay composable
const overlay = useOverlay()
// Create the modal instance for permission dialog
const permissionModal = overlay.create(BlobPermissionModal, { destroyOnClose: true })

/**
 * Handles microphone stream and sets up the analyser node.
 */
const handleMicrophoneStream = () => {
  if (!stream.value) return
  // Create audio context and analyser
  const audioContext = new (window.AudioContext)()
  const source = audioContext.createMediaStreamSource(stream.value)
  analyser.value = audioContext.createAnalyser()
  analyser.value.fftSize = 2048
  source.connect(analyser.value)
  // Prepare data array for frequency data
  const bufferLength = analyser.value.frequencyBinCount
  dataArray.value = new Uint8Array(bufferLength)
}

// Watch for permission changes and open/close modal accordingly
watch(
  () => micPermission.value,
  async (state) => {
    if (state === 'granted') {
      permissionModal.close()
      try {
        await start() // Start the user media stream
        handleMicrophoneStream()
      } catch {
        permissionModal.open()
      }
    } else if (state === 'prompt') {
      // Open modal and wait for user to click OK, then start stream to trigger browser dialog
      const modalInstance = permissionModal.open()
      await modalInstance.result
      try {
        await start()
        handleMicrophoneStream()
      } catch {
        // If user cancels or denies, keep modal open
        permissionModal.open()
      }
    } else if (state === 'denied') {
      permissionModal.open()
      stop()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="w-full h-full relative overflow-hidden">
    <NuxtLink class="absolute top-12 left-12" to="/">
      <img src="/logos/tres_logo_white.svg" alt="TresJS Logo">
    </NuxtLink>
    <ClientOnly>
      <TresLeches collapsed />
    </ClientOnly>
    <TresCanvas alpha clear-color="#0c1a30" class="relative z-10">
      <DancingBlobTheDancingBlob :analyser="analyser!" :data-array="dataArray!" />
      <TheScreenshot />
    </TresCanvas>
    <div class="bg-dance-text z-20" aria-hidden="true">
      SOUND
    </div>
    <div class="bg-track-text z-10" aria-hidden="true">
      01/Track
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap');

/* Your background text style */
.bg-dance-text {
  font-family: 'Anton', sans-serif;
  font-size: 18vw;
  color: #ffffff;
  letter-spacing: 0.05em;
  top: 50%;
  position: absolute;
  right: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
}

.bg-track-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 5vw;
  color: #ffffff;
  letter-spacing: 0.08em;
  position: absolute;
  left: 6rem;
  bottom: 2rem;
  transform: rotate(90deg) translateY(200%) translateX(-20%);
  pointer-events: none;
  user-select: none;
  z-index: 10;
  white-space: pre;
}
</style>

<!--
  All permission and stream logic is now handled by VueUse composables and Nuxt UI modal.
-->
