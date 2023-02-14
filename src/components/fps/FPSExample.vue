<script setup lang="ts">
import { ShallowRef, shallowRef } from 'vue'

import { useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import Sphere1 from './Sphere1.vue'
import Sphere2 from './Sphere2.vue'
import Sphere3 from './Sphere3.vue'

/* onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
}) */
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
    window-size
    power-preference="high-performance"
    physically-correct-lights
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[0, 0, 11]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <TresScene>
      <Sphere1 />
      <Sphere2 />
      <Sphere3 />
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>
