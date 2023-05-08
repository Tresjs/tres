<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { PCFSoftShadowMap, sRGBEncoding, NoToneMapping, Vector3 } from 'three'
import Floor from './floor.vue'
import House from './house.vue'
import Ghosts from './ghosts.vue'

const { pane } = useTweakPane()

const gl = {
  clearColor: '#262837',
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const moonOptions = reactive({
  intensity: 0.12,
  position: [4, 5, -2],
  color: '#b9d5ff',
})

pane.addInput(moonOptions, 'intensity', {
  label: 'intensity',
  min: 0,
  max: 1,
  step: 0.001,
})
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
    <TresAmbientLight color="#b9d5ff" :intensity="0.3" />
    <TresDirectionalLight
      v-bind="moonOptions"
      :shadow-mapSize-width="256"
      :shadow-mapSize-height="256"
      :shadow-camera-far="15"
      cast-shadow
    />
  </TresCanvas>
</template>
