<script setup lang="ts">
import { ref, shallowRef, onUnmounted, watch, onMounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PositionalAudio, Sphere, useGLTF, useProgress } from '@tresjs/cientos'
import { gsap } from 'gsap'

const gl = {
  clearColor: '#FAFAFA',
  shadows: true,
  alpha: false,
}

let tl, ctx

const ready = ref(false)
const positionalAudioRef = shallowRef(null)
const ballRef = shallowRef(null)
const innerAngle = ref(195)
const outerAngle = ref(260)
const outerGain = ref(0.4)

// eslint-disable-next-line max-len
const model = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/positional-audio/ping-pong.glb', { draco: true })

const onBallBounce = () => {
  const iteration = tl.iteration() % 2

  if (!iteration) {
    positionalAudioRef?.value?.play()
  }
}

watch([ballRef, ready], ([ball]) => {
  if (!ball?.value || !ready.value) return

  ctx.add(() => {
    tl = gsap
      .timeline({ repeat: -1, yoyo: true, onRepeat: onBallBounce })
      .to(ball.value.position, { y: 0, ease: 'power1.in', duration: .35 })
  })
})

onMounted(() => {
  ctx = gsap.context((self) => { }, ballRef?.value)
})

onUnmounted(() => {
  ctx?.revert()
  positionalAudioRef?.value?.dispose()
})
</script>

<template>
  <div
    v-if="!ready"
    class="ready"
  >
    <button @click="ready = true">
      click to continue
    </button>
  </div>

  <div
    v-if="ready"
    class="controls"
  >
    <button @click="tl?.play()">
      play
    </button>
    <button @click="tl?.pause()">
      pause
    </button>
  </div>

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 15]" />
    <OrbitControls make-default />

    <Sphere
      ref="ballRef"
      :args="[1, 16, 16]"
      :position="[0, 3, 0]"
      :rotation-x="Math.PI / -2"
      cast-shadow
      receive-shadow
    >
      <TresMeshStandardMaterial />

      <Suspense>
        <PositionalAudio
          ref="positionalAudioRef"
          :ready
          :inner-angle="innerAngle"
          :outer-angle="outerAngle"
          :outer-gain="outerGain"
          url="https://raw.githubusercontent.com/Tresjs/assets/main/music/ping-pong.mp3"
        />
      </Suspense>
    </Sphere>

    <Suspense>
      <primitive
        :scale="[.2, .2, .2]"
        :position="[0, -1.15, 0]"
        receive-shadow
        :object="model.scene"
      />
    </Suspense>

    <TresAmbientLight
      color="#ffffff"
      :intensity="2"
    />
    <TresDirectionalLight
      :position="[5, 10, 0]"
      :intensity="2"
      cast-shadow
    />
  </TresCanvas>
</template>

<style scoped>
.ready {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 24;
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

.ready button,
.controls button {
  padding: 5px 10px;
  background: #1B1C1E;
  border: 1px solid #161618;
}
</style>