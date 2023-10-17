<script setup lang="ts">
const { scene, materials } = await useGLTF('/models/halloween/pumpkin-ivysaur.glb', { draco: true })

scene.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true
    child.receiveShadow = true
  }
})
/* const light = materials['InternalLight']
light.emissiveIntensity = 10000 */
</script>

<template>
  <primitive :object="scene" />
</template>