<script setup lang="ts">
import { useTweakPane, useGLTF } from '@tresjs/cientos'

useTweakPane()

const { scene: model } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  {
    draco: true,
  },
)
model.position.set(0, 4, 0)
model.updateMatrixWorld()
</script>

<template>
  <Suspense>
    <TresMesh v-bind="model" />
  </Suspense>
</template>
