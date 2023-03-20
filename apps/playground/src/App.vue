<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { BasicShadowMap, NoToneMapping, sRGBEncoding } from 'three'
import { reactive, ref } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const groupRef = ref(null)

const groupRotation = reactive([0, 0, Math.PI / 2])

setInterval(() => {
  if (groupRef.value) {
    groupRef.value.rotation.z += Math.PI / 4
  }
  /*  groupRotation[2] += Math.PI / 4 */
}, 1000)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :args="[45, 1, 0.1, 2000]" :position="[3, 3, 4]" />
    <OrbitControls />
    <TresAmbientLight :args="[0xffffff, 1]" />
    <TresDirectionalLight :args="[0xffffff, 1.2]" />
    <TresGroup ref="groupRef" :rotation="groupRotation">
      <TresMesh>
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshToonMaterial :color="'teal'" />
      </TresMesh>
      <TresMesh :position="[2, 0, 0]">
        <TresSphereGeometry :args="[0.5, 32, 32]" />
        <TresMeshToonMaterial :color="'orange'" />
      </TresMesh>
    </TresGroup>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
