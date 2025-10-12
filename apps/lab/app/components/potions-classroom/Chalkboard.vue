<script setup lang="ts">
const { nodes } = useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)

const chalkboard = computed(() => nodes.value.Chalkboard)
</script>

<template>
  <primitive v-if="chalkboard" :object="chalkboard" />
</template>