<script setup lang="ts">
const { nodes, materials } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
const model = nodes.Cube

Object.assign(materials.coat, {
  envMapIntensity: 4,
  roughness: 0.5,
  metalness: 1,
})

Object.assign(materials.paint, {
  envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: '#555' 
})
</script>

<template>
  <primitive :object="model" />
</template>