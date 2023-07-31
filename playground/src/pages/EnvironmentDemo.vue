<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']

import { OrbitControls, useProgress, Environment, useTweakPane } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const environmentOptions = reactive({
  background: true,
  files: environmentFiles,
  path: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap',
})

const { pane } = useTweakPane()

pane.addInput(environmentOptions, 'background')

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
  <TresCanvas v-bind="gl">
    <OrbitControls />
    <Suspense>
      <Environment v-bind="environmentOptions" />
      <!-- <Environment
        background
        :files="environmentFiles"
        :path="'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap'"
      /> -->
    </Suspense>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
