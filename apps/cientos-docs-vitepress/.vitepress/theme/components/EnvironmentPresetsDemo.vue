<script setup lang="ts">
import { Environment, OrbitControls, TorusKnot, useProgress } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { ref } from 'vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { blur, preset } = useControls({
  background: true,
  blur: {
    value: 0,
    min: 0,
    max: 1,
    step: 0.01,
  },
  preset: {
    options: [
      'sunset',
      'studio',
      'city',
      'umbrellas',
      'night',
      'forest',
      'snow',
      'dawn',
      'hangar',
      'urban',
      'modern',
      'shangai',
    ],
    value: 'sunset',
  },
}, {
  uuid: 'presets',
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
    uuid="presets"
  />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls />
    <Suspense>
      <Environment
        ref="environmentRef"
        background
        :blur="blur.value"
        :preset="preset.value"
      />
    </Suspense>
    <TorusKnot>
      <TresMeshStandardMaterial
        color="yellow"
        :roughness="0"
        :metalness="0.5"
      />
    </TorusKnot>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
