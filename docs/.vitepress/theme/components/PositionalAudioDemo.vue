<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PositionalAudio, Box } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '##FAFAFA',
  shadows: true,
  alpha: false,
}

const ready = ref(false)
const positionalAudioRef = shallowRef(null);

const { helper } = useControls({
  helper: true,
})

console.log(helper)
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
</script>

<template>
  <TresLeches class="important-left-initial important-right-2" />

  <div v-if="!ready" class="ready">
    <button @click="ready = true">click to continue</button>
  </div>

  <div v-if="ready" class="controls">
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
        <PositionalAudio :ready="ready" ref="positionalAudioRef" :innerAngle="180" :outerAngle="230" :outerGain=".1"
          :distance="2" :helper="helper" url="/positional-audio/sound1.mp3" />
      </Suspense>
    </Box>

    <Box :args="[4, 2, 0.1]" :position="[0, 0, -1]">
      <TresMeshBasicMaterial color="#ff0000" transparent :opacity="0.5" />
    </Box>

    <TresGridHelper :position="[0, -.01, 0]" :args="[10, 10, '#c1c1c1', '#c1c1c1']" />
  </TresCanvas>
</template>

<style scoped>
.ready {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
  background-color: rgba(0, 0, 0, .75);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.controls {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  top: 25px;
  left: 25px;
  column-gap: 5px;
}

button {
  padding: 5px 10px;
  background: #1B1C1E;
  border: 1px solid #161618;
}
</style>