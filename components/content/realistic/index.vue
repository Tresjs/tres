<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Environment } from '@tresjs/cientos'
const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']
</script>

<template>
  <TresCanvas preset="realistic">
    <OrbitControls />
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <Suspense>
      <Environment
        background
        :files="environmentFiles"
        :path="'https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap'"
      />
    </Suspense>
    <Suspense>
      <Pokeball />
    </Suspense>

    <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
