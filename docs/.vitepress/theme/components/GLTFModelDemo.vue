<script setup lang="ts">
import { GLTFModel, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#F78B3D">
    <TresPerspectiveCamera :position="[3, 2, 5]" />
    <OrbitControls />
    <Suspense>
      <GLTFModel path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb" />
    </Suspense>
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
