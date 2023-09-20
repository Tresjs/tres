<script setup lang="ts">
const { nodes } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

const jars = Object.values(nodes).filter(node => node.name.includes('Jar'))
</script>

<template>
  <primitive
    v-for="jar of jars"
    :key="jar.uuid"
    :object="jar"
  />
</template>
