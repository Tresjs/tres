<script setup lang="ts">
import { ref, shallowRef, onUnmounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PositionalAudio, Box } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#FAFAFA',
  shadows: true,
  alpha: false,
}

const ready = ref(false)
const positionalAudioRef = shallowRef(null);

const { helper, innerAngle, outerAngle, outerGain } = useControls({
  helper: true,
  innerAngle: {
    label: 'innerAngle',
    value: 180,
    min: 0,
    max: 360,
    step: 1
  },
  outerAngle: {
    label: 'outerAngle',
    value: 280,
    min: 0,
    max: 360,
    step: 1
  },
  outerGain: {
    label: 'outerGain',
    value: 0,
    min: 0,
    max: 1,
    step: .01
  },
})

onUnmounted(() => {
  const { exposed } = positionalAudioRef.value.$
  exposed.dispose()
})

const handlerAudio = (action: string) => {
  const { exposed } = positionalAudioRef.value.$

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
        <PositionalAudio ref="positionalAudioRef" loop :ready :innerAngle="innerAngle.value"
          :outerAngle="outerAngle.value" :outerGain="outerGain.value" :helper="helper.value"
          url="/positional-audio/sound1.mp3" />
      </Suspense>
    </Box>

    <Box :args="[4, 2, 0.1]" :position="[0, 0, -1]">
      <TresMeshBasicMaterial color="#ff0000" transparent :opacity="0.5" />
    </Box>

    <TresGridHelper :position="[0, -.01, 0]" :args="[10, 10, '#c1c1c1', '#c1c1c1']" />
  </TresCanvas>
</template>

<style scoped>
@import "../assets/positional-audio/demo.css";
</style>