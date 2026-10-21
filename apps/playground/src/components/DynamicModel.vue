<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const { nodes }
  = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })

const { state: akuAku } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  { draco: true },
)

const { isCube } = useControls({
  isCube: false,
})

const model = computed(() => isCube.value ? nodes.value.BlenderCube : akuAku.value?.scene)
</script>

<template>
  <primitive v-if="model" :object="model" />
</template>
