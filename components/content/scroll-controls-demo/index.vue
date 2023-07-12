<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import {  Stars, ScrollControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#0F4866',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

const progress = ref(0)
const scRef = ref()

const cameraRef = ref()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (cameraRef.value) {
    if(progress.value <= 0.5) {
      cameraRef.value.position.x = -progress.value
      cameraRef.value.position.z = -progress.value * 2  + 6
    } else {
      const t = (progress.value - 0.5) * 4  // Normalize progress from 0.5 to 1 to range 0 to 1
      cameraRef.value.position.x = lerp(-0.5, 1, t*t) // Smoothly interpolate from -0.5 to 1 based on t
    }
  }
})

watchEffect(() => {
  if(!cameraRef.value) return
  console.log('jaime ~ progress:', {
    progress: progress.value,
    camera: cameraRef.value.position.x
  })
})
</script>

<template>
  <main>
    <section class="min-h-screen container flex justify-end items-center">
      <div class="w-1/2 text-right">
        <h2 class="text-4xl text-light font-extrabold ">Hi! 👋 I'm <span class="text-primary">AlvaroSabu</span></h2>

      </div>
    </section>
    <section class="min-h-screen container flex justify-end items-center">
      <div class="w-1/2 text-light text-right">
        <h2 class="text-4xl font-extrabold mb-4">Welcome to <span class="text-primary">TresJS</span></h2>
        <p class="font-italic">The coolest 3D solution for Vue </p>

      </div>
    </section>
    <section class="min-h-screen container flex justify-end items-center">
      <div class="w-1/2 text-light text-right">
        <h2 class="text-4xl font-extrabold mb-4">Launch your 3D Portfolio</h2>
        <p class="font-italic">And take it to the 🌕 🚀</p>

      </div>
    </section>
  </main>

    <TresCanvas v-bind="gl" window-size>
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 2, 5]"/>
      <Stars :radius="1" />
      <ScrollControls ref="scRef" 
      v-model="progress"
      :distance="10"
      :smooth-scroll="0.1"
      html-scroll
      >
      <Suspense>
        <LowPolyPlanet :progress="progress" />
      </Suspense>
      <Suspense>
        <Rocket :progress="progress" />
      </Suspense>

      </ScrollControls>
      <TresAmbientLight :intensity="2" />
      <TresPointLight color="#1BFFEF" :position="[0, 8, -16]" :intensity="8" cast-shadow />
      <TresDirectionalLight ref="directionalLightRef" :position="[0, 2, 4]" :intensity="1" cast-shadow />
    </TresCanvas>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

</style>
