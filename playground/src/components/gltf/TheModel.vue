<script setup lang="ts">
import { useTweakPane, useGLTF } from '@tresjs/cientos'

useTweakPane()

const { nodes, materials } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/threejs-journey/threejs-journey-level-vue.glb',
  {
    draco: true,
  },
)

const akuAkuRef = ref(null)

watch(akuAkuRef, value => {
  console.log('akuAkuRef', value)
})
</script>

<template>
  <primitive ref="akuAkuRef" :object="nodes.Cactus">
    <MeshWobbleMaterial :speed="10" :factor="0.4" :map="materials.Cactus.map" />
  </primitive>
</template>
