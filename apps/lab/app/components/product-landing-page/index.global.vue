<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace } from 'three'



const gl = {
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
}

const state = reactive({
  selectedColor: '#903345',
  colors: ['#903345', '#F2D3AC', '#F2F2F2', '#000000'],
})
</script>

<template>
  <div class="landingpage-bg w-full inset-0 h-full" />
  <div class="absolute
    p-8
    md:p-0
    w-full
    inset-0
    h-full
    flex
    flex-col
    md:flex-row
    md:justify-center
    md:items-center
    bg-red-200
    bg-opacity-75">
    <div class="w-full h-full md:w-2/3 md:h-1/2 bg-red-300 shadow-lg rounded flex flex-col md:flex-row">
      <div class="h-1/2 w-full md:w-1/2" />
      <div class="p-6 w-full md:w-1/2 md:p-4 text-light">
        <h1 class="title animate-fade-in-right animate-ease">
          Experience Sound
        </h1>

        <span class="absolute border-1 border-solid border-white w-800px inline-block" />

        <p class="w-full md:w-2/3 my-8 animate-fade-in">
          Experience unparalleled audio immersion with the innovative SonicWave™️ Harmony Headphones.
        </p>

        <ul class="flex gap-8">
          <li v-for="color in state.colors" :key="color">
            <button class="w-10 h-10 rounded-full border-2 border-solid border-white mr-2 cursor-pointer"
              :style="{ backgroundColor: color }" @click="state.selectedColor = color" />
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="absolute w-full md:w-1/2 inset-0 h-2/3 md:h-full flex justify-center items-center">
    <TresCanvas v-bind="gl" class="pointer-events-none">
      <TresPerspectiveCamera :position="[0, 0, 11]" />

      <!--  <MouseParallax :factor="0.1" /> -->
      <!--   <MouseParallax :factor="0.1" />
      <Suspense>
        <ProductLandingPageHeadphones :color="state.selectedColor" />
      </Suspense>
      <TresAmbientLight :intensity="2" />
      <TresPointLight :position="[0, 0, 10]" :intensity="1" />
      <TresDirectionalLight :position="[3, 3, 3]" :intensity="3" /> -->
      <Suspense>
        <ProductLandingPageHeadphones :color="state.selectedColor" />
      </Suspense>
      <TresAmbientLight :intensity="2" />
      <TresPointLight :position="[0, 0, 10]" :intensity="1" />
      <TresDirectionalLight :position="[3, 3, 3]" :intensity="3" />
      <TheScreenshot />
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

  @media (max-width: 768px) {
    margin-top: 20px;
    font-size: 64px;
  }
}

.landingpage-bg {
  background-image: url('/landingpage-bg.avif');
  filter: blur(24px);
}
</style>
