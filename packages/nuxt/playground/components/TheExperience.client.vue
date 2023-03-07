<script setup lang="ts">
import { useTexture } from '@tresjs/core'
import { Text3D } from '@tresjs/cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
const state = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
</script>
<template>
  <TresCanvas v-bind="state">
    <!--     <OrbitControls make-default /> -->
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />

    <TresScene>
      <TresAmbientLight :intensity="1" />
      <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
      <TresMesh ref="sphereRef" cast-shadow>
        <TresSphereGeometry />
        <TresMeshToonMaterial color="#FBB03B" />
      </TresMesh>
      <Text3D
        :position="[-1, 0, 0]"
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
      >
        TresJS
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
      </Text3D>
    </TresScene>
  </TresCanvas>
</template>
