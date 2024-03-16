<script setup lang="ts">
import { ref, shallowRef, onUnmounted, watch } from 'vue'
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
const positionalAudioRef = shallowRef(null)

const handlerAudio = (action: string) => {
  if (!positionalAudioRef.value) return

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

const { helper, innerAngle, outerAngle, outerGain } = useControls({
  playAudio: {
    label: 'Play',
    type: 'button',
    onClick: () => {
      handlerAudio('play')
    },
    size: 'sm',
  },
  pauseAudio: {
    label: 'Pause',
    type: 'button',
    onClick: () => {
      handlerAudio('pause')
    },
    size: 'sm',
  },
  stopAudio: {
    label: 'Stop',
    type: 'button',
    onClick: () => {
      handlerAudio('stop')
    },
    size: 'sm',
  },
  helper: true,
  innerAngle: {
    label: 'innerAngle',
    value: 180,
    min: 0,
    max: 360,
    step: 1,
  },
  outerAngle: {
    label: 'outerAngle',
    value: 280,
    min: 0,
    max: 360,
    step: 1,
  },
  outerGain: {
    label: 'outerGain',
    value: 0,
    min: 0,
    max: 1,
    step: .01,
  },
})

watch(helper.value, () => {
  innerAngle.value.visible = outerAngle.value.visible = outerGain.value.visible = helper.value.value
})

onUnmounted(() => {
  if (!positionalAudioRef.value) return

  const { dispose } = positionalAudioRef.value
  dispose()
})
</script>

<template>
  <TresLeches class="important-left-initial important-right-2" />

  <div
    v-if="!ready"
    class="ready"
  >
    <button @click="ready = true">
      click to continue
    </button>
  </div>

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Box :args="[1, 1, 1]">
      <TresMeshNormalMaterial />
      <Suspense>
        <PositionalAudio
          ref="positionalAudioRef"
          loop
          :ready
          :inner-angle="innerAngle.value"
          :outer-angle="outerAngle.value"
          :outer-gain="outerGain.value"
          :helper="helper.value"
          url="/positional-audio/sound1.mp3"
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
      :args="[10, 10, '#c1c1c1', '#c1c1c1']"
    />
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

.ready button {
  padding: 5px 10px;
  background: #1B1C1E;
  border: 1px solid #161618;
}
</style>