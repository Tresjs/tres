<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls } from '@tresjs/cientos'

// import { OrbitControls, Box } from '@tresjs/cientos'
/* import { TresLeches, useControls } from '@tresjs/leches' */
/* import '@tresjs/leches/styles' */

const gl = reactive({
  /*   clearColor: '#82DBC5', */
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

/* useControls('fpsgraph') */
// useControls(gl)
// useControls('Box', boxPosition.value)

const boxWidth = ref(1)

setTimeout(() => {
  boxWidth.value = 2
}, 2000)
</script>

<template>
  <TresCanvas v-bind="gl" :window-size="true">
    <OrbitControls />
    <TresPerspectiveCamera :look-at="[0, 4, 0]" />
    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[boxWidth, 1, 1]" />
      <TresMeshToonMaterial color="teal" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>