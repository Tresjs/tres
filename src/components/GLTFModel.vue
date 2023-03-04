<script setup lang="ts">
import { sRGBEncoding } from 'three'

import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>

<template>
  <Suspense>
    <TresCanvas clear-color="#82DBC5" shadows alpha window-size :output-encoding="sRGBEncoding">
      <OrbitControls />
      <TresPerspectiveCamera :position="[5, 5, 5]" :fov="75" :near="0.1" :far="1000" />
      <TresScene :fog="'#82DBC5'">
        <TresAmbientLight :color="0xffffff" :intensity="0.75" />
        <TresDirectionalLight :position="[0, 8, 4]" :intensity="1" cast-shadow />
        <GLTFModel path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf" draco />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
