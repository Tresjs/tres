<script setup lang="ts">
import {
  Environment,
  Lightformer,
  OrbitControls,
  Sphere,
  useProgress,
} from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const environmentFiles = [
  '/px.jpg',
  '/nx.jpg',
  '/py.jpg',
  '/ny.jpg',
  '/pz.jpg',
  '/nz.jpg',
]

const { progress, hasFinishLoading } = await useProgress()

const { intensity, form, toneMapped, color } = useControls({
  intensity: { value: 100, min: 0, max: 200, step: 1 },
  form: { value: 'rect', options: ['circle', 'ring', 'rect'] },
  toneMapped: false,
  color: '#ffffff',
}, { uuid })
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
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Suspense>
        <Environment
          :files="environmentFiles"
          :blur="10"
          :environmentIntensity="0.05"
          path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap"
        >
          <Lightformer :intensity="intensity" :position="[0, -2, 3]" :scale="2" :form="form" :tone-mapped="toneMapped" :color="color" />
          <Lightformer :intensity="intensity" :position="[0, 2, -3]" :scale="2" :form="form" :tone-mapped="toneMapped" :color="color" />
        </Environment>
      </Suspense>
      <Sphere>
        <TresMeshStandardMaterial color="yellow" :roughness="0" :metalness="0.5" />
      </Sphere>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
</template>
