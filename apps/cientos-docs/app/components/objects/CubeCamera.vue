<script setup lang="ts">
import { CubeCamera, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { onMounted, onUnmounted, shallowRef } from 'vue'

const x = shallowRef(1)
const y0 = shallowRef(1)
const y1 = shallowRef(1)
let intervalId: ReturnType<typeof setInterval>

let elapsed = 0
onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 1000 / 30
    x.value = Math.cos(elapsed * 0.001) * 3
    y0.value = (Math.sin(elapsed * 0.001) + 1) * 2
    y1.value = (Math.sin(elapsed * 0.001 + Math.PI) + 1) * 2
  }, 1000 / 30)
})

onUnmounted(() => { clearInterval(intervalId) })
</script>

<template>
  <TresCanvas clear-color="#222">
    <TresPerspectiveCamera :position="[0, 5, 20]" />
    <OrbitControls />

    <CubeCamera :position-y="5" :resolution="128">
      <TresMesh :position="[-2, y0, 0]" :scale="2">
        <TresSphereGeometry />
        <TresMeshPhysicalMaterial :roughness="0" :metalness="1" />
      </TresMesh>
      <TresMesh :position="[2, y1, 0]" :scale="2">
        <TresSphereGeometry />
        <TresMeshPhysicalMaterial :roughness="0.25" :metalness="1" />
      </TresMesh>
    </CubeCamera>

    <TresMesh :position="[x, 1, 0]">
      <TresSphereGeometry />
      <TresMeshBasicMaterial color="#fbb03b" />
    </TresMesh>

    <TresGridHelper :args="[100, 10]" />
  </TresCanvas>
</template>
