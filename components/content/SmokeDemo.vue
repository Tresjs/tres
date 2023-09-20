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
const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-[#333] text-white w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
      </div>
    </div>
  </Transition>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 12]" />
    <Suspense>
      <Smoke
        :position="[-4, -2, 0]"
        :segments="8"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :position="[-4, 2, 0]"
        :segments="8"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :segments="8"
        color="#c4c4c4"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :position="[4, -2, 0]"
        :segments="8"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :position="[4, 2, 0]"
        :segments="8"
      />
    </Suspense>
    <Suspense>
      <BlenderCube />
    </Suspense>
    <Precipitation
      :area="[15, 15, 15]"
      :size="0.1"
      :count="500"
      :speed="2"
      :randomness="0"
    />
    <TresGridHelper
      :size="10"
      :divisions="10"
      :position-y="-1"
    />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[2, 2, 2]"
    />
    <OrbitControls />
  </TresCanvas>
</template>
