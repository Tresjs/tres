<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })

const { nodes } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  { draco: true },
)
const model = nodes.AkuAku
const { isCube } = useControls({
  isCube: true,
})
</script>

<template>
  <primitive :object="isCube ? scene : model" />
</template>