<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#333',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb')
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 12]" />
    <Suspense>
      <Smoke :position="[-4, -2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :position="[-4, 2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :segments="8" color="#c4c4c4" />
    </Suspense>
    <Suspense>
      <Smoke :position="[4, -2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :position="[4, 2, 0]" :segments="8" />
    </Suspense>
    <primitive :object="scene" />
    <Precipitation :area="[15, 15, 15]" :size="0.1" :count="500" :speed="2" :randomness="0" />
    <TresGridHelper :size="10" :divisions="10" :position-y="-1" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>
