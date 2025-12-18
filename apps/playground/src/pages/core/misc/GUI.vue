<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
// import { OrbitControls, Box } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

import { BasicShadowMap, NoToneMapping, SRGBColorSpace, Vector3 } from 'three'

const gl = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

const boxPosition = ref(new Vector3(0, 0, 0))

useControls('fpsgraph')
useControls(gl)
useControls('Box', {
  position: boxPosition.value,
})

const boxWidth = ref(1)

setTimeout(() => {
  boxWidth.value = 2
}, 2000)
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    :window-size="true"
  >
    <TresPerspectiveCamera :look-at="[0, 4, 0]" />
    <OrbitControls />
    <TresMesh :position-x="boxPosition.x">
      <TresBoxGeometry :args="[boxWidth, 1, 1]" />
      <TresMeshToonMaterial color="teal" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
