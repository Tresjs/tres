<script setup lang="ts">
import { CubeCamera, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Fog } from 'three'

const visible = shallowRef(true)
const y0 = shallowRef(1)
const y1 = shallowRef(1)
const y2 = shallowRef(1)
const f = shallowRef(1)
const redFog = new Fog('red', 1, 20)
const whiteFog = new Fog('white', 1, 20)
const fog = shallowRef(whiteFog)
const far = shallowRef(1000)
let intervalId: ReturnType<typeof setInterval>

let elapsed = 0
onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 1000 / 30
    y0.value = (1 + Math.sin(elapsed * 0.001)) * 6
    y1.value = (1 + Math.sin(elapsed * 0.001 + 2 * Math.PI / 3)) * 6
    y2.value = (1 + Math.sin(elapsed * 0.001 + 4 * Math.PI / 3)) * 6
    visible.value = Math.sin(elapsed * 0.001) > 0
    f.value = Infinity
    fog.value = Math.sin(elapsed * 0.1) <= 0 ? redFog : whiteFog
    // far.value = (Math.sin(elapsed * 0.001) + 1) * 100
  }, 1000 / 30)
})

onUnmounted(() => { clearInterval(intervalId) })
</script>

<template>
  <TresCanvas clear-color="#222">
    <TresPerspectiveCamera :position="[3, 10, 40]" />
    <OrbitControls />

    <TresFog attach="fog" :args="['#f0f0f0', 100, 200]" />

    <CubeCamera :position-y="10" :frames="f" :fog="fog" :far="far">
      <TresMesh :position-x="-8" :scale="2" :position-y="y0">
        <TresTorusKnotGeometry />
        <TresMeshPhysicalMaterial :roughness="0.25" :metalness="1" />
      </TresMesh>

      <TresMesh :position-x="8" :position-y="y1" :scale="5">
        <TresSphereGeometry />
        <TresMeshPhysicalMaterial :roughness="0.25" :metalness="1" />
      </TresMesh>

      <TresMesh v-if="y0 >= 4" :position-z="8" :position-y="y2" :scale="3">
        <TresTorusGeometry />
        <TresMeshPhysicalMaterial :roughness="0.25" :metalness="1" />
      </TresMesh>
    </CubeCamera>

    <TresGroup>
      <TresMesh :position-y="2.5" :position-x="y0">
        <TresBoxGeometry :args="[5, 5, 5]" />
        <TresMeshStandardMaterial color="hotpink" />
      </TresMesh>

      <TresAmbientLight :intensity="3.14" />
      <TresPointLight :intensity="500" :position="[40, 40, 0]" />

      <TresGridHelper :args="[100, 10]" />
    </TresGroup>
  </TresCanvas>
</template>
