<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { TresCanvas } from '@tresjs/core'

// import { GLTFModel, OrbitControls } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  disableRender: false,
  stencil: false,
})

const state2 = reactive({
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,

  /*  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping, */
})

const log = () => {
  console.log(3)
}
</script>

<template>
  <div class="flex">
    <input
      id=""
      v-model="state.clearColor"
      type="text"
      name=""
    >
    <input
      v-model="state.stencil"
      type="checkbox"
      name=""
    >
    <div class="w-1/2 aspect-video">
      <TresCanvas v-bind="state">
        <TresPerspectiveCamera
          :position="[5, 5, 5]"
          :fov="45"
          :near="0.1"
          :far="1000"
          :look-at="[0, 4, 0]"
        />

        <TresAmbientLight :intensity="0.5" />
        <TresMesh
          :position="[0, 4, 0]"
          @click="log"
        >
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="cyan" />
        </TresMesh>

        <Suspense>
          <TestSphere />
        </Suspense>
        <TresDirectionalLight
          :position="[0, 2, 4]"
          :intensity="1"
        />
      </TresCanvas>
    </div>
    <div class="w-1/2 aspect-video">
      <TresCanvas v-bind="state2">
        <TresPerspectiveCamera
          :position="[5, 5, 5]"
          :fov="45"
          :near="0.1"
          :far="1000"
          :look-at="[0, 4, 0]"
        />
        <TresAmbientLight :intensity="0.5" />

        <TresMesh
          :position="[0, 4, 0]"
          cast-shadow
        >
          <TresSphereGeometry :args="[2, 32, 32]" />
          <TresMeshToonMaterial color="yellow" />
        </TresMesh>

        <!-- <Suspense>
          <GLTFModel path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf" draco />
        </Suspense> -->

        <TresDirectionalLight
          :position="[0, 2, 4]"
          :intensity="1"
          cast-shadow
        />
      </TresCanvas>
    </div>
  </div>
</template>
