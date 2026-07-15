<script setup lang="ts">
import type { ShaderToyMuseumState } from './const'

const state: ShaderToyMuseumState = inject('state')!

const shaderToyTarget = computed(() => state.shaderToyTargets[state.i])


const { textures } = useTextures([
  '/textures/shadertoy-museum/normal.jpg',
  '/textures/shadertoy-museum/roughness.jpg',
  '/textures/shadertoy-museum/displacement.png',
])

watch(shaderToyTarget, (target) => {
  if (target) {
    console.log('target', target)
  }
}, { immediate: true })

</script>
<template>
  <TresMesh v-if="shaderToyTarget" ref="floorRef" :position="shaderToyTarget.floor.position"
    :scale="shaderToyTarget.floor.scale" :quaternion="shaderToyTarget.floor.quaternion">
    <TresPlaneGeometry :args="[10, 10]" />
    <MeshReflectionMaterial :mix="0.5" :normal-map="textures[0]" :roughness-map="textures[1]"
      :displacement-map="textures[2]" />
  </TresMesh>
</template>