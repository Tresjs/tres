<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { Environment, OrbitControls, Sphere, useProgress } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { ref } from 'vue'

const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { background, blur } = useControls({
  background: true,
  blur: {
    value: 0,
    min: 0,
    max: 1,
    step: 0.01,
  },
}, {
  uuid: 'environment',
})

const environmentRef = ref(null)

const { progress, hasFinishLoading } = await useProgress()
</script>

<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-white t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
        <i class="i-ic-twotone-catching-pokemon animate-rotate-in"></i>
      </div>
    </div>
  </Transition>
  <TresLeches
    class="top-0 important-left-4"
    uuid="environment"
  />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[7, 7, 7]" />
    <OrbitControls />
    <Suspense>
      <Environment
        ref="environmentRef"
        :background="background.value"
        :files="environmentFiles"
        :blur="blur.value"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap"
      />
      <!-- <Environment
        :background="background.value"
        :blur="blur.value"
        preset="sunset"
      /> -->
    </Suspense>
    <Sphere>
      <TresMeshStandardMaterial
        color="yellow"
        :roughness="0"
        :metalness="0.5"
      />
    </Sphere>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
