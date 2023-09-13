<!-- eslint-disable no-console -->
<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { CameraControls } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const controlsState = reactive({
  minDistance: 0,
  maxDistance: 100,
})

const controlsRef = shallowRef()
const boxMeshRef = shallowRef()
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <CameraControls
      v-bind="controlsState"
      ref="controlsRef"
      make-default
    />
    <TresGridHelper :position="[0, -1, 0]" />
    <TresMesh ref="boxMeshRef">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshToonMaterial
        color="orange"
      />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[0, 2, 4]"
    />
  </TresCanvas>
</template>
