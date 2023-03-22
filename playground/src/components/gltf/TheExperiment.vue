<script setup lang="ts">
import { sRGBEncoding, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { GLTFModel, OrbitControls } from '@cientos'

/* import { OrbitControls, GLTFModel } from '@tresjs/cientos' */

const state = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,

  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})



</script>
<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
    <OrbitControls make-default />
    <TresAmbientLight :intensity="0.5" />

    <Suspense>
        <GLTFModel path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf" draco />
      <!--   <AkuAku /> -->
    </Suspense>
    <TresAxesHelper />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
  </TresCanvas>
</template>
