<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { GlobalAudio } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const exampleAudio
  = 'https://raw.githubusercontent.com/Tresjs/assets/main/music/sunny-afternoon.mp3'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
}
const options = useControls({
  volume: { value: 0.5, min: 0, max: 3, step: 0.1 },
  playbackRate: { value: 0.5, min: 0, max: 3, step: 0.1 },
})
</script>

<template>
  <TresLeches />
  <div class="floating-controls">
    <button id="pauseBtn">
      Pause
    </button>
    <button id="playBtn">
      Play
    </button>
    <button id="stopBtn">
      Stop
    </button>
  </div>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 0, 7.5]"
      :fov="75"
      :near="0.1"
      :far="1000"
    />
    <GlobalAudio
      :src="exampleAudio"
      :volume="options.volume.value.volume"
      :loop="false"
      :playback-rate="options.playbackRate.value.playbackRate"
      play-element="playBtn"
      pause-element="pauseBtn"
      stop-element="stopBtn"
      @is-playing="(e) => console.log('isPlaying', e)"
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
