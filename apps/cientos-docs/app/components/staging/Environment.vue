<script setup lang="ts">
import { Environment, OrbitControls, Sphere, useProgress } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']

const { progress, hasFinishLoading } = await useProgress()

const { background, blur, preset, backgroundIntensity, environmentIntensity, backgroundRotationY, syncMaterials, environmentRotationY } = useControls({
  background: true,
  blur: { value: 0, min: 0, max: 1, step: 0.01 },
  preset: { value: 'sunset', options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'] },
  backgroundIntensity: { value: 1, min: 0, max: 2, step: 0.01 },
  environmentIntensity: { value: 1, min: 0, max: 2, step: 0.01 },
  backgroundRotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  environmentRotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  syncMaterials: false,
})
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
  <div class="aspect-video">
    <TresCanvas>
      <TresPerspectiveCamera :position="[7, 7, 7]" />
      <OrbitControls />
      <Suspense>
        <Environment
          :background="background"
          :files="environmentFiles"
          :blur="blur"
          :preset="preset"
          :background-intensity="backgroundIntensity"
          :environment-intensity="environmentIntensity"
          :background-rotation="[0, backgroundRotationY, 0]"
          :environment-rotation="[0, environmentRotationY, 0]"
          :syncMaterials="syncMaterials"
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
  </div>
  <TresLeches :float="false" />
</template>
