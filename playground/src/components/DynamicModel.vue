<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { useGLTF } from '@tresjs/cientos'

const { nodes } 
  = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', 
    { draco: true })

const { scene: AkuAku, nodes: akukuNodes } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf',
  { draco: true },
)

const { isCube } = useControls({
  isCube: false,
})
</script>

<template>
  <primitive :object="isCube ? nodes.Cube : AkuAku" />
</template>