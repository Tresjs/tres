<!-- eslint-disable no-console -->
<script setup lang="ts">
import { Environment, Lightformer, OrbitControls, Sphere, useProgress } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import Lightformers from './Lightformers.vue'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace, Vector3 } from 'three'

const uuid = 'staging-environment'

/* const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg'] */

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { background, blur, preset, backgroundIntensity, environmentIntensity, backgroundRotation, environmentRotation, syncMaterials } = useControls({
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
  backgroundIntensity: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.1,
  },
  environmentIntensity: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.1,
  },
  backgroundRotation: {
    value: new Vector3(0, 0, 0),
  },
  environmentRotation: {
    value: new Vector3(0, 0, 0),
  },
  syncMaterials: false,
}, { uuid })

const environmentRef = ref(null)

watchEffect(() => {
  console.log(background.value.value)
})

watchEffect(() => {
  console.log(environmentRef.value)
})

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
  <TresLeches :uuid="uuid" />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <Suspense>
      <!-- <Environment
        ref="environmentRef"
        :background="background.value"
        :files="environmentFiles"
        :blur="blur.value"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap"
      /> -->
      <Environment
        :background="background"
        :blur="blur"
        :preset="preset"
        :frames="Infinity"
        :background-intensity="backgroundIntensity"
        :environment-intensity="environmentIntensity"
        :background-rotation="[backgroundRotation.x, backgroundRotation.y, backgroundRotation.z]"
        :environment-rotation="[environmentRotation.x, environmentRotation.y, environmentRotation.z]"
        :sync-materials="syncMaterials"
      >
        <Lightformer
          :intensity="0.75"
          :rotation-x="Math.PI / 2"
          :position="[0, 5, -9]"
          :scale="[10, 10, 1]"
        />
        <Lightformers />
      </Environment>
    </Suspense>
    <Sphere>
      <TresMeshStandardMaterial
        color="yellow"
        :roughness="0"
        :metalness="0.5"
      />
    </Sphere>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
