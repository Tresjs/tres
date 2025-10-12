<script lang="ts" setup>
import { MathUtils } from 'three'

const playing = shallowRef(false)

function onClick() {
  playing.value = !playing.value
}

const attribution = 'Just Enough by Yarin Primak from Artlist.io'
const attributionLength = shallowRef(0)
const attributionDisplay = computed(() => attribution.slice(0, Math.min(attribution.length, attributionLength.value)))
const typing = shallowRef(false)
let attributionLengthTarget = 0
let timeout: ReturnType<typeof setTimeout> = setTimeout(() => { }, 0)

function nextLetter() {
  attributionLength.value = MathUtils.clamp(
    attributionLength.value + Math.sign(attributionLengthTarget - attributionLength.value),
    0,
    attribution.length,
  )
  typing.value = attributionLengthTarget != attributionLength.value
  if (typing.value) {
    clearTimeout(timeout)
    timeout = setTimeout(nextLetter, 25)
  }
}

watch(playing, (p) => {
  if (p) {
    attributionLengthTarget = attribution.length
  }
  else {
    attributionLengthTarget = 0
  }
  nextLetter()
})
</script>

<template>
  <div 
    :class="[
      'flex justify-end items-center gap-1 fixed right-0 bottom-0 z-10',
      'my-3 mb-24 pr-3 border border-r-0 border-white text-white font-mono',
      'whitespace-pre-wrap cursor-pointer transition-colors duration-500',
      typing ? 'text-cyan-400 bg-indigo-950' : 'bg-purple-900 hover:bg-purple-800'
    ]"
  >
    <UButton 
      :icon="playing ? 'i-lucide-volume-2' : 'i-lucide-volume-x'"
      size="lg"
      variant="ghost"
      color="white"
      class=" hover:text-yellow-400 transition-colors duration-500"
      @click="onClick"
    />
    <audio v-if="playing" autoplay loop
      src="/music/yarin-primak-just-enough.mp3">
      <a href="https://artlist.io/royalty-free-music/song/just-enough/137412"> Download audio </a>
    </audio>
    <ULink 
      to="https://artlist.io/royalty-free-music/song/just-enough/137412"
      class="text-white hover:text-yellow-400 transition-colors duration-500"
      external
    >
      {{ attributionDisplay }}
    </ULink>
  </div>
</template>

