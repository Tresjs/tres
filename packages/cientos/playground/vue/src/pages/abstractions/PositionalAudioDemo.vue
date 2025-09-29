<script setup lang="ts">
import { Box, OrbitControls, PositionalAudio } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useState } from '../../composables/state'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
}

const ready = ref(false)
const positionalAudioIsPlaying = ref(false)
const positionalAudioRef = shallowRef(null)

const handlerAudio = (action: string) => {
  if (!positionalAudioRef.value) { return }

  const { play, pause, stop } = positionalAudioRef.value

  if (action === 'play') {
    play()
  }
  else if (action === 'pause') {
    pause()
  }
  else if (action === 'stop') {
    stop()
  }
}

const onContinue = () => {
  ready.value = true
}

const { renderingTimes } = useState()

function onRender() {
  renderingTimes.value = 1
}
</script>

<template>
  <div
    v-if="!ready"
    class="playground-positional-audio__ready"
  >
    <button @click="onContinue">
      click to continue
    </button>
  </div>

  <div
    v-if="ready"
    class="playground-positional-audio__controls"
  >
    <div class="playground-positional-audio__controls-events">
      <p>
        @is-playing: {{ positionalAudioIsPlaying }}
      </p>
    </div>

    <div class="playground-positional-audio__controls-methods">
      <button @click="handlerAudio('play')">
        play
      </button>
      <button @click="handlerAudio('pause')">
        pause
      </button>
      <button @click="handlerAudio('stop')">
        stop
      </button>
    </div>
  </div>
  <GraphPane />
  <TresCanvas v-bind="gl" render-mode="on-demand" @render="onRender">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Box :args="[1, 1, 1]">
      <TresMeshNormalMaterial />

      <Suspense>
        <PositionalAudio
          ref="positionalAudioRef"
          :ready="ready"
          :inner-angle="180"
          :outer-angle="220"
          :outer-gain=".2"
          :distance="2"
          helper
          url="https://raw.githubusercontent.com/Tresjs/assets/main/music/beat-1.mp3"
          @is-playing="(e) => positionalAudioIsPlaying = e"
        />
      </Suspense>
    </Box>

    <Box
      :args="[4, 2, 0.1]"
      :position="[0, 0, -1]"
    >
      <TresMeshBasicMaterial
        color="#ff0000"
        transparent
        :opacity="0.5"
      />
    </Box>

    <TresGridHelper
      :position="[0, -.01, 0]"
      :args="[10, 10]"
    />
  </TresCanvas>
</template>

<style scoped>
.playground-positional-audio__ready {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.playground-positional-audio__controls {
  position: fixed;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(5px);
  top: 25px;
  left: 25px;
  column-gap: 5px;
}

.playground-positional-audio__controls-methods,
.playground-positional-audio__controls-events {
  display: flex;
  align-items: center;
  backdrop-filter: blur(5px);
  top: 25px;
  left: 25px;
  column-gap: 5px;
}

.playground-positional-audio__controls button {
  padding: 5px 10px;
}
</style>
