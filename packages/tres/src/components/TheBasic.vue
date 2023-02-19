<script setup lang="ts">
import { sRGBEncoding, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref } from 'vue'

import { OrbitControls, TransformControls } from '@tresjs/cientos'
import { useRenderLoop } from '..'
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

const sphereRef = ref()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  sphereRef.value.position.y += Math.sin(elapsed * 0.01) * 0.1
})
</script>
<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
    <OrbitControls make-default />
    <TresScene>
      <TresAmbientLight :intensity="0.5" />
      <TransformControls mode="scale" :object="sphereRef" />

      <TresMesh ref="sphereRef" :position="[0, 4, 0]" cast-shadow>
        <TresSphereGeometry />
        <TresMeshToonMaterial color="#FBB03B" />
      </TresMesh>
      <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
      <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
        <TresPlaneGeometry :args="[10, 10, 10, 10]" />
        <TresMeshToonMaterial />
      </TresMesh>
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>
