<script setup lang="ts">
import { Lensflare, OrbitControls, Torus } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { shallowRef } from 'vue'

const uuid = 'abstractions-lensflare-elements'

const TEXTURE_PATH = 'https://raw.githubusercontent.com/Tresjs/assets/93976c7d63ac83d4a254a41a10b2362bc17e90c9/textures/lensflare/'

const [x, z] = [shallowRef(0), shallowRef(0)]
const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  z.value = Math.cos(elapsed * 0.5) * 2
  x.value = Math.sin(elapsed)
})

const { scale, distance, color } = useControls({
  scale: { value: 0.5, min: 0.01, max: 3, step: 0.01 },
  distance: { value: 1, min: 0, max: 3, step: 0.1 },
  color: '#ffffff',
}, { uuid })

const elements = [
  // Body – large glow at the light source
  { texture: `${TEXTURE_PATH}circleBlur.png`, size: 700, distance: 0 },
  { texture: `${TEXTURE_PATH}rays.png`, size: 300, distance: 0 },
  // Front – scattered smaller shapes toward camera
  { texture: `${TEXTURE_PATH}circle.png`, size: 80, distance: 0.4, color: 'dimgray' },
  { texture: `${TEXTURE_PATH}ring.png`, size: 140, distance: 0.8, color: 'gray' },
  { texture: `${TEXTURE_PATH}polyStroke6.png`, size: 50, distance: 1.2, color: 'darkgray' },
  { texture: `${TEXTURE_PATH}circleBlur.png`, size: 100, distance: 1.6, color: 'dimgray' },
  { texture: `${TEXTURE_PATH}circle.png`, size: 30, distance: 2.0, color: 'gray' },
  { texture: `${TEXTURE_PATH}ring.png`, size: 60, distance: 2.4, color: 'darkgray' },
  // Back – behind the light source
  { texture: `${TEXTURE_PATH}circleBlur.png`, size: 200, distance: -0.3, color: 'gray' },
  { texture: `${TEXTURE_PATH}poly6.png`, size: 120, distance: -0.5, color: 'dimgray' },
]
</script>

<template>
  <OrbitControls />
  <TresPointLight :position="[x, 0, z]">
    <Lensflare
      :elements="elements"
      :scale="scale"
      :distance="distance"
      :color="color"
    />
  </TresPointLight>
  <Torus
    v-for="n in [-2, 0, 2]"
    :key="n"
    :args="[0.7, 0.15]"
    :position-z="n"
    :rotation-y="Math.PI * 0.5"
  >
    <TresMeshPhongMaterial color="#888" />
  </Torus>
  <TresGridHelper :position="[0, -0.9, 0]" />
</template>
