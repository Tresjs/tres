<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'

import ThePokeball from './ThePokeball.vue'

const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']
</script>

<template>
  <Suspense>
    <TresCanvas preset="realistic">
      <OrbitControls />
      <TresPerspectiveCamera :position="[11, 11, 11]" />
      <TresScene>
        <Environment
          background
          :files="environmentFiles"
          :path="'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap'"
        />
        <ThePokeball />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
      </TresScene>
    </TresCanvas>
    <template #fallback>
      <div class="bg-gray-900 flex justify-center items-center w-full h-full">
        <h1 class="font-bold text-4xl text-teal-700">Loading...</h1>
      </div>
    </template>
  </Suspense>
</template>
