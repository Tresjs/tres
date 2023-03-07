<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
const state = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})
</script>
<template>
  <TresCanvas v-bind="state">
    <!-- <OrbitControls make-default /> -->
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />

    <TresScene>
      <TresAmbientLight :intensity="1" />
      <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
      <TresMesh ref="sphereRef" cast-shadow>
        <TresSphereGeometry />
        <TresMeshToonMaterial color="#FBB03B" />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
