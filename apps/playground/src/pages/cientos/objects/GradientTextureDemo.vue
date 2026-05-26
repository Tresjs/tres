<script setup lang="ts">
import { GradientTexture, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Color } from 'three'

const gl = {
  clearColor: '#82DBC5',
}

const CIENTOS = {
  BLUE: '#82dbc5',
  GREY: '#4f4f4f',
  ORANGE: '#fbb03b',
}
const GRADIENTS = [
  { stops: [0.0, 0.1, 0.8], colors: [CIENTOS.GREY, CIENTOS.BLUE, CIENTOS.ORANGE] },
  { stops: [0.0], colors: [CIENTOS.GREY] },
  { stops: [0.5, 1.0], colors: [CIENTOS.BLUE, CIENTOS.GREY] },
  { stops: [0.0, 0.1, 0.8], colors: [CIENTOS.BLUE, CIENTOS.ORANGE, CIENTOS.ORANGE] },
]

const i = shallowRef(0)
const stops = ref([0, 0.25, 1.0])
const colors = ref([new Color('red'), new Color('blue'), new Color('green')])

let intervalId: ReturnType<typeof setInterval>
let elapsed = 0

onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 0.1
    i.value = Math.floor(elapsed) % GRADIENTS.length

    stops.value[0] = Math.abs(Math.sin(elapsed))
    stops.value[1] = Math.abs(Math.sin(elapsed + 0.5))
    stops.value[2] = Math.abs(Math.sin(elapsed + 1))
  }, 1000 / 30)
})

onUnmounted(() => { clearInterval(intervalId) })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <OrbitControls />

    <TresMesh :position-x="0.75">
      <TresPlaneGeometry />
      <TresMeshBasicMaterial>
        <GradientTexture :stops="GRADIENTS[i].stops" :colors="GRADIENTS[i].colors" />
      </TresMeshBasicMaterial>
    </TresMesh>

    <TresMesh :position-x="-0.75">
      <TresPlaneGeometry />
      <TresMeshBasicMaterial>
        <GradientTexture type="radial" :stops="stops" :colors="colors" :width="1024" />
      </TresMeshBasicMaterial>
    </TresMesh>
  </TresCanvas>
</template>
