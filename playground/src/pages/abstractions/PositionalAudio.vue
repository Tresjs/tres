<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PositionalAudio, Box } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
}

const ready = ref(false)
const positionalAudioRef = shallowRef(null);

const handlerAudio = (action: string) => {
  const { exposed } = positionalAudioRef.value.$

  // console.log(exposed.ref)

  if (action === 'play') {
    exposed.play()
  } else if (action === 'pause') {
    exposed.pause()
  } else if (action === 'stop') {
    exposed.stop()
  }
}

const onContinue = () => {
  ready.value = true
}
</script>

<template>

  <div v-if="!ready" class="playground-positional-audio__ready">
    <button @click="onContinue">click to continue</button>
  </div>

  <div v-if="ready" class="playground-positional-audio__controls">
    <button @click="handlerAudio('play')">play</button>
    <button @click="handlerAudio('pause')">pause</button>
    <button @click="handlerAudio('stop')">stop</button>
  </div>

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Box :args="[1, 1, 1]">
      <TresMeshNormalMaterial />

      <Suspense>
        <PositionalAudio :ready="ready" ref="positionalAudioRef" :innerAngle="220" :outerAngle="220" :outerGain=".2"
          :distance="2" helper url="/positional-audio/sound1.mp3" />
      </Suspense>
    </Box>

    <Box :args="[4, 2, 0.1]" :position="[0, 0, -1]">
      <TresMeshBasicMaterial color="#ff0000" transparent :opacity="0.5" />
    </Box>

    <TresGridHelper :position="[0, -.01, 0]" :args="[10, 10]" />
  </TresCanvas>
</template>

<style scoped>
.playground-positional-audio__ready {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, .75);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.playground-positional-audio__controls {
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  top: 25px;
  left: 25px;
  column-gap: 5px;
}

.playground-positional-audio__controls button {
  padding: 5px 10px;
}
</style>