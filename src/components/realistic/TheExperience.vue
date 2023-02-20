<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { shallowRef, watch } from 'vue'
import ThePokeball from './ThePokeball.vue'

const environmentTexture = shallowRef()

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
  </Suspense>
</template>
