<script setup lang="ts">
import { Environment, OrbitControls, Sphere, useProgress } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { ref } from 'vue'

const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']

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
  <TresCanvas>
    <TresPerspectiveCamera :position="[7, 7, 7]" />
    <OrbitControls />
    <Suspense>
      <Environment
        ref="environmentRef"
        :background="true"
        :files="environmentFiles"
        :blur="0"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap"
      />
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
