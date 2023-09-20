<script setup lang="ts">
const { nodes } = await useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)
</script>

<template>
  <primitive :object="nodes.Chalkboard" />
</template>