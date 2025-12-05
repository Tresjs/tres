<script setup lang="ts">
import { OrbitControls, PositionalAudio, Sphere, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { gsap } from 'gsap'
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

let tl: gsap.core.Timeline, ctx: gsap.Context

const ready = ref(false)
const positionalAudioRef = shallowRef(null)
const ballRef = shallowRef(null)

const options = {
  innerAngle: 195,
  outerAngle: 260,
  outerGain: 0.3,
}

const { state } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/positional-audio/ping-pong.glb', { draco: true })

const onBallBounce = () => {
  const iteration = tl.iteration() % 2

  if (!iteration) {
    positionalAudioRef?.value?.play()
  }
}

watch([ready], () => {
  if (!ballRef?.value || !ready.value) { return }

  ctx.add(() => {
    tl = gsap
      .timeline({ repeat: -1, yoyo: true, onRepeat: onBallBounce })
      .to(ballRef.value.instance.position, { y: 0, ease: 'power1.in', duration: 0.35 })
  })
})

onMounted(() => {
  ctx = gsap.context(() => { })
})

onUnmounted(() => {
  positionalAudioRef?.value?.dispose()
  ctx?.revert()
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

  <TresCanvas
    clear-color="#82DBC5"
  >
    <TresPerspectiveCamera :position="[0, 0.5, 15]" />
    <OrbitControls make-default />

    <Sphere
      ref="ballRef"
      :args="[1, 16, 16]"
      :position="[0, 3, 0]"
      :rotation-x="Math.PI / -2"
    >
      <TresMeshStandardMaterial />

      <Suspense>
        <PositionalAudio
          ref="positionalAudioRef"
          :ready
          :inner-angle="options.innerAngle"
          :outer-angle="options.outerAngle"
          :outer-gain="options.outerGain"
          :helper="true"
          url="https://raw.githubusercontent.com/Tresjs/assets/main/music/ping-pong.mp3"
        />
      </Suspense>
    </Sphere>
    <primitive
      v-if="state?.scene"
      :scale="[.2, .2, .2]"
      :position="[0, -1.15, 0]"
      receive-shadow
      :object="state?.scene"
    />
    <TresAmbientLight
      color="#ffffff"
      :intensity="2"
    />
    <TresDirectionalLight
      :position="[5, 10, 0]"
      :intensity="2"
    />
  </TresCanvas>
</template>

<style scoped>
.ready {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 24;
  background-color: rgba(0, 0, 0, 0.75);
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
  background: #1b1c1e;
  border: 1px solid #161618;
}
</style>
