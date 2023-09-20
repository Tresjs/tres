<script setup lang="ts">
import { PCFSoftShadowMap, SRGBColorSpace } from 'three'
import Floor from './floor.vue'
import House from './house.vue'
import Ghosts from './ghosts.vue'

const gl = {
  clearColor: '#262837',
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[4, 2, 5]" />
    <TresFog :args="['#262837', 1, 15]" />
    <OrbitControls />

    <Suspense>
      <House />
    </Suspense>
    <Suspense>
      <Floor />
    </Suspense>
    <Ghosts />
    <TresAmbientLight
      color="#b9d5ff"
      :intensity="0.3"
    />
    <TresDirectionalLight
      :args="['#b9d5ff', 1.12]"
      :position="[4, 5, -2]"
      :shadow-mapSize-width="256"
      :shadow-mapSize-height="256"
      :shadow-camera-far="15"
      cast-shadow
    />
  </TresCanvas>
</template>
