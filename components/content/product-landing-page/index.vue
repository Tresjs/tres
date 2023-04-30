<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'

import { OrbitControls, PamCameraMouse } from '@tresjs/cientos'
import Headphones from './Headphones.vue'

const gl = {
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const state = reactive({
  selectedColor: '#903345',
  colors: ['#903345', '#F2D3AC', '#F2F2F2', '#000000'],
})
</script>

<template>
  <div class="landingpage-bg w-full inset-0 h-full"></div>
  <div class="absolute w-full inset-0 h-full flex justify-center items-center bg-red-200 bg-opacity-75">
    <div class="w-2/3 h-1/2 bg-red-300 shadow-lg rounded flex">
      <div class="w-1/2"></div>
      <div class="w-1/2 p-4 text-light">
        <h1 class="title animate-fade-in-right animate-ease">Experience Sound</h1>

        <span class="absolute border-1 border-solid border-white w-800px inline-block" />

        <p class="w-2/3 my-8 animate-fade-in">
          Experience unparalleled audio immersion with the innovative SonicWave™️ Harmony Headphones. Our groundbreaking
          noise-canceling technology and powerful bass features will transport you into a world of pure sound, free from
          distractions.
        </p>

        <p class="w-2/3 mb-8 animate-fade-in">
          With customizable color options and a sleek, fashionable design, these headphones are the perfect marriage of
          style and performance.
        </p>
        <ul class="flex gap-8">
          <li v-for="color in state.colors">
            <button
              class="w-10 h-10 rounded-full border-2 border-solid border-white mr-2 cursor-pointer"
              :style="{ backgroundColor: color }"
              @click="state.selectedColor = color"
            ></button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="absolute w-1/2 inset-0 h-full flex justify-center items-center">
    <TresCanvas v-bind="gl" class="pointer-events-none">
      <TresPerspectiveCamera :position="[0, 0, 11]" />
      <PamCameraMouse :factor="0.1" />
      <Suspense>
        <Headphones :color="state.selectedColor" />
      </Suspense>
      <TresAmbientLight :intensity="2" />
      <TresPointLight :position="[0, 0, 10]" :intensity="1" />
      <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Heebo&display=swap');

* {
  font-family: 'Heebo', sans-serif;
}

.title {
  margin-top: -120px;
  font-family: 'Bebas Neue', cursive;
  font-size: 128px;
}

.landingpage-bg {
  background-image: url('/landingpage-bg.avif');
  filter: blur(24px);
}
</style>
