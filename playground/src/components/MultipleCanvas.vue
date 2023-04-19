<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, sRGBEncoding } from 'three'
import { TresCanvas } from '/@/components/TresCanvas'
import { GLTFModel, OrbitControls } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})

const state2 = reactive({
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,

  /*  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping, */
})
</script>
<template>
  <div class="flex">
    <div class="w-1/2 aspect-video">
      <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 4, 0]" />
        <OrbitControls />

        <TresAmbientLight :intensity="0.5" />
        <TresMesh :position="[0, 4, 0]">
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="cyan" />
        </TresMesh>

        <Suspense>
          <TestSphere />
        </Suspense>
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" />
      </TresCanvas>
    </div>
    <div class="w-1/2 aspect-video">
      <TresCanvas v-bind="state2">
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 4, 0]" />
        <TresAmbientLight :intensity="0.5" />

        <TresMesh :position="[0, 4, 0]" cast-shadow>
          <TresSphereGeometry :args="[2, 32, 32]" />
          <TresMeshToonMaterial color="yellow" />
        </TresMesh>
        <OrbitControls />

        <Suspense>
          <GLTFModel
            path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf"
            draco
          />
        </Suspense>

        <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
      </TresCanvas>
    </div>
  </div>
</template>
