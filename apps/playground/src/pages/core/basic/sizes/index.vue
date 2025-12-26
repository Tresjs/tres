<script setup lang="ts">
import { TresLeches } from '@tresjs/leches'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import Child from './Child.vue'
const uuid = 'core-basic-sizes'
const state = reactive({
  width: 0,
  height: 0,
  aspectRatio: 0,
  pixelRatio: 0,
})
provide('state-sizes', state)

</script>
<template>
  <TresLeches uuid="uuid">
    <p>Width: {{ state.width }}</p>
    <p>Height: {{ state.height }}</p>
    <p>Aspect Ratio: {{ state.aspectRatio }}</p>
    <p>Pixel Ratio: {{ state.pixelRatio }}</p>
  </TresLeches>
  <TresCanvas window-size clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[8, 8, 8]" />
    <OrbitControls />
    <Child />
    <TresGridHelper />
  </TresCanvas>
</template>