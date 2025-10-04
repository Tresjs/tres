<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, MeshPhongMaterial, NoToneMapping, SRGBColorSpace } from 'three'
import { reactive } from 'vue'

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

const paneElements = reactive({
  boxVisible: true,
  groupVisible: true,
  boxPropMaterialVisible: true,
})

useControls('fpsgraph')
useControls(paneElements)

const material = new MeshPhongMaterial({ color: '#ff0000' })
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <TresDirectionalLight
      :position="[0, 8, 4]"
      :intensity="0.2"
      cast-shadow
    />
    <TresMesh
      v-if="paneElements.boxPropMaterialVisible"
      :position="[0, 0, 0]"
      :material="material"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
    </TresMesh>
    <TresMesh
      v-if="paneElements.boxVisible"
      :position="[4, 0, 0]"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshToonMaterial color="#efefef" />
    </TresMesh>
    <TresGroup
      v-if="paneElements.groupVisible"
      :position="[0, -4, -5]"
    >
      <TresGroup>
        <TresMesh :position="[0, 0, 0]">
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshBasicMaterial color="#efef11" />
        </TresMesh>
      </TresGroup>
    </TresGroup>
    <OrbitControls />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
