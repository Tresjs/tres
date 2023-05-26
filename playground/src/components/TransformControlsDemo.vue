<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, TransformControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef = ref()
const sphereRef = ref()

const transformRef = ref()

function changeObject(object: any) {
  transformRef.value = object
}

const context = ref()
</script>

<template>
  <TresCanvas v-bind="gl" ref="context">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls make-default />

    <TresMesh ref="boxRef" :position="[-2, 1, 0]" @click="changeObject(boxRef)">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TransformControls v-if="transformRef" :object="transformRef" />
    <TresMesh ref="sphereRef" :position="[2, 1, 0]" @click="changeObject(sphereRef)">
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresGridHelper />
  </TresCanvas>
</template>
