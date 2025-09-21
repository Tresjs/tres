<script lang="ts" setup>
import { MathUtils } from 'three'

const playing = shallowRef(false)

function onClick() {
  playing.value = !playing.value
}

const attribution = 'synthwave_line by vlad.zaichyk CC0'
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
  <div :class="`music-player ${typing ? 'typing' : ''}`">
    <div class="music-player-button" tabindex="0" role="button" @keypress="onClick" @click="onClick">
      <svg v-if="playing" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
        class="bi bi-volume-up-fill" viewBox="0 0 16 16">
        <path
          d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
        <path
          d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
        <path
          d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
        class="bi bi-volume-mute" viewBox="0 0 16 16">
        <path
          d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
      </svg>
      <audio v-if="playing" autoplay loop
        src="https://github.com/Tresjs/assets/raw/3ea3ed097656d37d91a164a939a21ccc3af1eca0/music/synthwave_line.mp3">
        <a href="https://freesound.org/people/vlad.zaichyk/sounds/495329/"> Download audio </a>
      </audio>
    </div>
    <a href="https://freesound.org/people/vlad.zaichyk/sounds/495329/">{{ attributionDisplay }}</a>
  </div>
</template>

<style scoped>
.music-player {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10;
  margin: 12px 0 96px;
  padding-right: 12px;
  border: 1px solid #fff;
  border-right: 0;
  color: #fff;
  background-color: #2e2157;
  font-family: monospace;
  white-space: pre-wrap;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.5s;
}

.music-player.typing,
.music-player.typing:hover {
  color: #2de2e6;
  background-color: #0d0221;
}

.music-player:hover {
  background-color: #241734;
}

.music-player-button:hover,
a:hover {
  color: #f9c80e;
  transition-property: color;
  transition-duration: 0.5s;
}

.music-player-button {
  padding: 5px 8px;
  color: #fff;
}
</style>
