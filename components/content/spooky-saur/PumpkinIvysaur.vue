<script setup lang="ts">
const { nodes, materials } = await useGLTF('/models/halloween/pumpkin-ivysaur.glb', { draco: true })

const pumpkinIvysaur = nodes['Scene']
/* scene.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true
    child.receiveShadow = true
  }
}) */
</script>

<template>
  <primitive :object="pumpkinIvysaur" />
</template>