<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Plane, useTweakPane } from '@tresjs/cientos'
import { BasicShadowMap, NoToneMapping, sRGBEncoding } from 'three'
import { shallowReactive, shallowRef } from 'vue'

const gl = shallowReactive({
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
    <OrbitControls />
    <Suspense> </Suspense>
    <TresDirectionalLight :position="[-3, 4, 4]" :intensity="2" cast-shadow />
    <TresDirectionalLight :position="[3, 4, 0]" :intensity="0.5" cast-shadow />
    <MaterialSphere />
    <Plane :args="[10, 10]">
      <TresMeshToonMaterial color="#222" />
    </Plane>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
