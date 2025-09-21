<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import type { PerspectiveCamera } from 'three'
import gsap from 'gsap'

const gl = {
  shadows: true,
  alpha: true,
}

const cameraRef = ref<PerspectiveCamera | null>(null)

const onViewClicked = () => {
  if (!cameraRef.value) return
  gsap.to(cameraRef.value.position, {
    duration: 1,
    x: 0,
    y: 3,
    z: 3,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (cameraRef.value)
        cameraRef.value.lookAt(0, 3, 0)
    },
  })
}

const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <div class="hero absolute z-30 prose p-24">
    <h2 class="text-6xl opacity-0 animate-fade-in animate-delay-1s animate-forwards transition-all ease-in-out">
      iTres
    </h2>
    <p class="text-2xl opacity-0 animate-fade-in animate-delay-2s animate-forwards transition-all ease-in-out">
      New fancy phone, mind-blowing. Head turning.
    </p>
    <p class="opacity-0 animate-fade-in animate-delay-4s animate-forwards transition-all ease-in-out">
      Only $2999.99
    </p>
  </div>
  <Transition name="fade-overlay" enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200">
    <div v-show="!hasFinishLoading"
      class="absolute t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono">
      <div class="w-200px text-black text-center">
        <p class="animate-tada">
          🤳
        </p>
        Loading... {{ progress }} %
      </div>
    </div>
  </Transition>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera ref="cameraRef" :position="[4, 4, 4]" :look-at="[0, 2, 0]" />
    <HtmlPhoneIPhone @view-clicked="onViewClicked" />
    <ContactShadows :blur="3.5" :resolution="512" :opacity="1" />
    <Suspense>
      <Environment background :blur="0.9" preset="city" />
    </Suspense>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[2, 3, 0]" :cast-shadow="true" :shadow-camera-far="50"
      :shadow-camera-left="-10" :shadow-camera-right="10" :shadow-camera-top="10" :shadow-camera-bottom="-10" />
    <TheScreenshot />
  </TresCanvas>
</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/sf-pro-display');

.hero {
  font-family: 'SF Pro Display';
}
</style>
