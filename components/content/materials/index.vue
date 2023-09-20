<script setup lang="ts">
import { OrbitControls, Plane } from '@tresjs/cientos'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { shallowReactive } from 'vue'

const gl = shallowReactive({
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[3, 3, 5]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <Suspense />
    <TresDirectionalLight
      :position="[-3, 4, 4]"
      :intensity="2"
      cast-shadow
    />
    <TresDirectionalLight
      :position="[3, 4, 0]"
      :intensity="0.5"
      cast-shadow
    />
    <MaterialSphere />
    <Plane :args="[10, 10]">
      <TresMeshToonMaterial color="#222" />
    </Plane>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
