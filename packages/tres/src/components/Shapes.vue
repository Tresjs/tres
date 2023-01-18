<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, sRGBEncoding } from 'three'
import { reactive, shallowRef, watch } from 'vue'
import { Plane, Box, Sphere, Torus, TorusKnot, OrbitControls } from '../../../cientos/src/'

const state = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  physicallyCorrectLights: true,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const planeRef = shallowRef()
const boxRef = shallowRef()
const torusRef = shallowRef()
const torusKnotRef = shallowRef()

watch(planeRef, plane => {
  console.log('plane', plane.value.position)
})
watch(boxRef, box => {
  console.log('box', box.value.position)
})
watch(torusRef, torus => {
  console.log('torus', torus.value.position)
})
watch(torusKnotRef, torusKnot => {
  console.log('torusKnot', torusKnot.value.position)
})
</script>
<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="75" :aspect="1" :near="0.1" :far="1000" />
    <OrbitControls />
    <TresScene>
      <TresAmbientLight :color="0xffffff" :intensity="1" />
      <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
      <Plane ref="planeRef" :args="[8, 8]" :position="[0, 4, 0]" receive-shadow>
        <TresMeshToonMaterial color="teal" />
      </Plane>
      <Box ref="boxRef" :arg0s="[1, 1, 1]" :position="[0, 6, 0]" cast-shadow>
        <TresMeshToonMaterial color="orange" />
      </Box>
      <Sphere ref="sphereRef" :args="[1, 32, 16]" :position="[2, 6, 0]" cast-shadow>
        <TresMeshToonMaterial color="pink" />
      </Sphere>
      <Torus ref="torusRef" :args="[0.75, 0.4, 16, 80]" :position="[-2, 6, 0]" cast-shadow>
        <TresMeshToonMaterial color="cyan" />
      </Torus>
      <TorusKnot ref="torusKnotRef" :args="[0.6, 0.2, 64, 8]" :position="[-2, 6, 2]" cast-shadow>
        <TresMeshToonMaterial color="lime" />
      </TorusKnot>
    </TresScene>
  </TresCanvas>
</template>
