<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, sRGBEncoding } from 'three'
import { reactive, shallowRef, watch } from 'vue'
import { Plane, Box, OrbitControls } from '../../../cientos/src/'

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

watch(planeRef, plane => {
  console.log('plane', plane.value.position)
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
      <Box ref="boxRef" :args="[1, 1, 1]" :position="[0, 6, 0]" cast-shadow>
        <TresMeshToonMaterial color="orange" />
      </Box>
    </TresScene>
  </TresCanvas>
</template>
