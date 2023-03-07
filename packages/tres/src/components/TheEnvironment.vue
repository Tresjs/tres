<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { Environment, Box, PamCameraMouse } from '../../../cientos/src'
import { TresCanvas } from '../core/useRenderer/component'
/* import { OrbitControls, GLTFModel } from '@tresjs/cientos' */

const sphereRef = ref()

/* const environmentFiles = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/px.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/nx.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/py.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/ny.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/pz.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap/nz.jpg',
] */

const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']

let envMap = null

const environmentTexture = shallowRef()

watch(environmentTexture, ({ getTexture }) => {
  envMap = getTexture()
})
</script>
<template>
  <!--   <TresCanvas v-bind="state"> -->
  <TresCanvas preset="realistic">
    <TresPerspectiveCamera :position="[10, 10, 18]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />

    <TresScene>
      <Environment
        ref="environmentTexture"
        :files="environmentFiles"
        background
        :path="'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap'"
      />
      <!--  <Environment ref="environmentTexture" background preset="sunset" /> -->
      <TresAmbientLight :intensity="0.5" />

      <TresMesh ref="sphereRef" :position="[0, 4, 0]" cast-shadow>
        <TresSphereGeometry />
        <TresMeshStandardMaterial color="#FBB03B" :map="envMap" :metalness="1" :roughness="0" />
      </TresMesh>
      <Box :position="[2, 6, 0]" cast-shadow>
        <TresMeshStandardMaterial color="#008080" :map="envMap" :metalness="1" :roughness="0" />
      </Box>
      <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
      <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
        <TresPlaneGeometry :args="[20, 20, 20, 10]" />
        <TresMeshToonMaterial />
      </TresMesh>
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
    </TresScene>
  </TresCanvas>
</template>
