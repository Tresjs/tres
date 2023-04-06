<script setup lang="ts">
import { BasicShadowMap, MeshToonMaterial, NoToneMapping, sRGBEncoding } from 'three'
import { reactive } from 'vue'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { TresCanvas } from '/@/'

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const paneElements = reactive({
  boxVisible: true,
  groupVisible: true,
})

const { pane } = useTweakPane()

pane.addInput(paneElements, 'boxVisible')
pane.addInput(paneElements, 'groupVisible')

const material = new MeshToonMaterial({ color: '#ff0000' })
</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[11, 11, 11]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />

    <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.2" cast-shadow />
    <TresMesh v-if="paneElements.boxVisible" :position="[0, 0, 0]" :material="material">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <!-- <TresMeshToonMaterial color="#efefef" /> -->
    </TresMesh>

    <!-- <TresGroup v-if="paneElements.groupVisible" :position="[0, -4, -5]">
      <TresMesh :position="[0, 0, 0]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshToonMaterial color="#efef11" />
      </TresMesh>
    </TresGroup> -->
    <OrbitControls></OrbitControls>
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
