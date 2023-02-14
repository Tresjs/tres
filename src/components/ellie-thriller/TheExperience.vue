<script setup lang="ts">
import { sRGBEncoding } from 'three'
import { OrbitControls } from '@tresjs/cientos'

import Ellie from './Ellie.vue'
</script>

<template>
  <Suspense>
    <TresCanvas
      clear-color="black"
      shadows
      alpha
      window-size
      power-preference="high-performance"
      :output-encoding="sRGBEncoding"
    >
      <OrbitControls />
      <TresPerspectiveCamera :position="[0, 1, 3]" :fov="75" :near="0.1" :far="1000" />
      <TresScene>
        <TresAmbientLight :color="0xffffff" :intensity="0.25" />
        <Ellie />
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
