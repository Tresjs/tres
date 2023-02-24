<script setup lang="ts">
import { sRGBEncoding, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
// import { useRenderLoop } from '..'
/* import { OrbitControls, GLTFModel } from '@tresjs/cientos' */

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  physicallyCorrectLights: true,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})
</script>
<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera
      :position-x="5"
      :position-y="5"
      :position-z="5"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <OrbitControls make-default />
    <TresScene>
      <TresAmbientLight :intensity="0.5" />

      <TresMesh
        :scale-x="1.1"
        :scale-y="2"
        :scale-z="3"
        :rotation-x="Math.PI * 1.5"
        :rotation-y="Math.PI * 0.6"
        :rotation-z="Math.PI * 0.2"
        :position-y="1"
        :position-z="-2"
        cast-shadow
      >
        <TresBoxGeometry />
        <TresMeshToonMaterial color="#FBB03B" />
      </TresMesh>
      <TresDirectionalLight :position-y="8" :position-z="4" :intensity="0.7" cast-shadow />
      <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
        <TresPlaneGeometry :args="[10, 10, 10, 10]" />
        <TresMeshToonMaterial />
      </TresMesh>
      <TresDirectionalLight :position-y="2" :position-z="4" :intensity="1" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>
