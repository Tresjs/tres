<script setup lang="ts">
///<reference types="vite-svg-loader" />
import Triangle from '../assets/triangle.svg'
import SecondRow from '../assets/second-row.svg'
import ThirdRow from '../assets/third-row.svg'
import gsap from 'gsap'
import { onMounted, ref } from 'vue'

const triangleRef = ref()
const secondRowRef = ref()
const thirdRowRef = ref()

onMounted(() => {
  const tl2r = gsap.timeline()
  const tl3r = gsap.timeline()

  tl2r.to(secondRowRef.value.$el, {
    delay: 1,
    duration: 2,
    y: -1253,
    ease: 'elastic.easeOut',
  })

  tl3r.to(thirdRowRef.value.$el, {
    delay: 1.25,
    duration: 2,
    y: -1253,
    ease: 'elastic.easeOut',
  })
})
</script>

<template>
  <div class="grid items-center w-full min-w-370px -translate-x-20px md:translate-x-20px h-full scale-75">
    <div class="grid grid-cols-3 gap-8 overflow-hidden h-93px">
      <Triangle ref="triangleRef" />
      <SecondRow ref="secondRowRef" />
      <ThirdRow ref="thirdRowRef" />
    </div>
  </div>
</template>

<style scoped></style>
