<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'

import HologramCube from './HologramCube.vue'
</script>

<template>
  <SceneWrapper>
    <TresCanvas>
      <TresPerspectiveCamera
        :position="[3, 3, 3]"
        :look-at="[0, 0, 0]"
      />
      <Suspense>
        <HologramCube />
      </Suspense>
      <OrbitControls />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </SceneWrapper>
</template>
