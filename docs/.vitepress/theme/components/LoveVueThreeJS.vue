<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
import Triangle from '../assets/triangle.svg'
import SecondRow from '../assets/second-row.svg'
import ThirdRow from '../assets/third-row.svg'

const triangleRef = ref()
const secondRowRef = ref()
const thirdRowRef = ref()

const tl2r = gsap.timeline()
const tl3r = gsap.timeline()

const heightOfSignleSvg = 150

async function restartAnimation() {
  gsap.to(secondRowRef.value.$el, {
    duration: 1,
    y: 0,
    ease: 'elastic.out(0.7, 0.2)',
  })
  await gsap.to(thirdRowRef.value.$el, {
    delay: 0.65,
    duration: 1,
    y: 0,
    ease: 'steps(4)',
  })

  tl2r.restart()
  tl3r.restart()
}

onMounted(() => {
  tl2r.to(secondRowRef.value.$el, {
    delay: 1,
    duration: 2,
    y: -(8 * heightOfSignleSvg),
    ease: 'elastic.easeOut',
  })
  tl3r.to(thirdRowRef.value.$el, {
    delay: 1.25,
    duration: 2,
    y: -(12 * heightOfSignleSvg),
    ease: 'power1.out',
  })
})
</script>

<template>
  <div
    class="grid items-center w-full min-w-370px -translate-x-20px md:translate-x-20px h-full scale-75"
    @click="restartAnimation"
  >
    <div class="grid grid-cols-3 gap-8 overflow-hidden h-93px">
      <Triangle ref="triangleRef" />
      <SecondRow ref="secondRowRef" />
      <ThirdRow ref="thirdRowRef" />
    </div>
  </div>
</template>
