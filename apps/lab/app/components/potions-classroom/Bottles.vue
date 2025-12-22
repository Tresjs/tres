<script setup lang="ts">
// Load GLTF model without await to get reactive reference
const { nodes } = useGLTF(
  '/models/potions-classroom/wizard-potions-classroom.glb',
  {
    draco: true,
  },
)

// Filter bottle nodes reactively using computed
const bottles = computed(() => Object.values(nodes.value).filter(node => node.name.includes('Bottle')))
</script>

<template>
  <template v-if="bottles">
    <primitive v-for="(bottle, $index) of bottles" :key="$index" :object="bottle" />
  </template>
</template>