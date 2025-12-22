<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import { useMouse } from '@vueuse/core'
import gsap from 'gsap'



const { x, y } = useMouse()

const gl = {
  clearColor: 'black',
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')

const lightRef = ref()

watch([x, y], () => {
  // Normalize the mouse position to a range that's relevant for your scene
  const mouseX = (x.value / window.innerWidth) * 2 - 1
  const mouseY = (y.value / window.innerHeight) * -2 + 1

  // Use the mouse position to set the direction of the light
  // Adjust these values based on your scene's size and scale
  lightRef.value.position.set(mouseX * 10, mouseY * 10, 5)
  lightRef.value.lookAt(0, 0, 0) // Look at the world origin
})

const cameraRef = ref()
const cameraPosition = ref(new Vector3(-0.63, 2, 0.63))

useControls({ cameraPosition })

const { hasFinishLoading, progress } = await useProgress()

const onDavidReady = () => {
  gsap.to(cameraRef.value.position, {
    duration: 10,
    x: -0.63,
    y: 5,
    z: 4.63,
    ease: 'power2.inOut',
    onUpdate: () => {
      cameraRef.value.lookAt(0, 3, 0)
    },
  })
}
</script>

<template>
  <Transition name="fade-overlay" enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200">
    <div v-show="!hasFinishLoading"
      class="absolute bg-black t-0 l-0 w-full h-full z-30 flex justify-center items-center text-white font-mono">
      <div class="font-italic title w-200px">
        Loading Art... {{ progress }} %
      </div>
    </div>
  </Transition>
  <div class="cursor fixed w-16 h-16 bg-white bg-opacity-40 rounded-full" :style="{ left: `${x}px`, top: `${y}px` }" />
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera ref="cameraRef" :position="cameraPosition" :look-at="[0, 5, 0]" />
    <TresFog color="black" />
    <BrickelangeloDavidTheDavid @ready="onDavidReady" />
    <TresSpotLight ref="lightRef" :position="[5, 5, 5]" :intensity="8" cast-shadow />
    <TheScreenshot />
  </TresCanvas>
  <div
    class="title absolute left-0 bottom-30 w-full text-white z-20 pointer-events-none flex flex-col items-center justify-around">
    <h2 class="text-3xl font-italic">
      Brickelangelo's
    </h2>
    <h1 class="text-8xl my-8">
      David
    </h1>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital@0;1&display=swap');

html {
  cursor: none !important;
}

.cursor {
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
}

.title {
  font-family: 'Amiri', serif;
}

.title h2 {
  letter-spacing: 0.25em;
}

.title h1 {
  letter-spacing: 0.25em;
}

.title>h1:after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: calc(50% - 25px);
  width: 50px;
  height: 2px;
  background: #fff;
}
</style>
