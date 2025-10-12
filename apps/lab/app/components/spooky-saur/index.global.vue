<script setup lang="ts">
import type { PerspectiveCamera } from 'three'
import { DoubleSide } from 'three'

const cameraRef = ref<PerspectiveCamera | null>(null)
const fontPath = '/fonts/jetbrains-mono.json'

const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <Transition name="fade-overlay" enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200">
    <div v-show="!hasFinishLoading"
      class="absolute bg-[#A590FF] t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono">
      <div class="w-200px text-black text-center">
        <p class="animate-tada">
          🎃🦇
        </p>
        Loading... {{ progress }} %
      </div>
    </div>
  </Transition>
  <TresCanvas clear-color="#A590FF">
    <TresPerspectiveCamera ref="cameraRef" :look-at="[0, 1, 0]" :position="[1, 2, 8]" />
    <OrbitControls :max-distance="10" :min-azimuth-angle="-Math.PI / 6" :max-azimuth-angle="Math.PI / 6"
      :min-polar-angle="0" :max-polar-angle="Math.PI / 2 - Math.PI / 18" :target="[0, 1, 0]" />
    <Backdrop :floor="10" :scale="[150, 40, 10]" :position="[0, -0.05, -20]" receive-shadow>
      <TresMeshStandardMaterial color="#A590FF" :side="DoubleSide" />
    </Backdrop>
    <Suspense>
      <Text3D text="SPOOKY" :font="fontPath" :size="2" :position="[-2, 4, -6]" :rotation="[0, Math.PI / 3, 0]">
        <TresMeshStandardMaterial />
      </Text3D>
    </Suspense>
    <SpookySaurInsideLight />
    <TresFog color="#A590FF" :near="2" :far="20" />
    <SpookySaurPumpkinIvysaur />
    <SpookySaurHalloweenDecorations />

    <EffectComposerPmndrs :depth-buffer="true">
      <BloomPmndrs :luminance-threshold="0.2" :luminance-smoothing="0.3" :intensity="0.1" />
    </EffectComposerPmndrs>
    <TresAmbientLight :intensity="0.1" />
    <TresDirectionalLight color="#FF3F00" :intensity="0.6" :position="[3, 3, 3]" :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024" :shadow-camera-far="50" :shadow-camera-left="-10" :shadow-camera-right="10"
      :shadow-camera-top="10" :shadow-camera-bottom="-10" :shadow-bias="-0.000001" cast-shadow />
    <TresDirectionalLight color="white" :intensity="0.4" :position="[2, 1, 3]" :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024" :shadow-camera-far="50" :shadow-camera-left="-10" :shadow-camera-right="10"
      :shadow-camera-top="10" :shadow-camera-bottom="-10" :shadow-bias="-0.000001" />
    <TheScreenshot />
  </TresCanvas>
</template>