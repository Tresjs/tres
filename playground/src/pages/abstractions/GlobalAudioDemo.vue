<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { GlobalAudio } from '@tresjs/cientos'

const exampleAudio
  = 'https://raw.githubusercontent.com/Tresjs/assets/main/music/sunny-afternoon.mp3'

const isPlaying = shallowRef(false)
const sound = shallowRef(false)

watch(sound, (value) => {
  console.log(value)
})
</script>

<template>
  <div class="floating-controls">
    <button id="playBtn">
      {{ !isPlaying ? 'Play' : 'Pause' }}
    </button>
    <button id="stopBtn">
      Stop
    </button>
  </div>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera
      :position="[0, 0, 7.5]"
      :fov="75"
      :near="0.1"
      :far="1000"
    />
    <GlobalAudio
      ref="sound"
      :src="exampleAudio"
      :volume="0.5"
      :loop="true"
      :playback-rate="1"
      play-trigger="playBtn"
      stop-trigger="stopBtn"
      @is-playing="(e) => isPlaying = e"
    />
  </TresCanvas>
</template>

<style scoped>
.floating-controls {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
