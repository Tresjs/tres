<script setup lang="ts">
const { state } = useGLTF('/models/halloween/pumpkin-ivysaur.glb', { draco: true })

</script>

<template>
  <primitive v-if="state" :object="state.scene" />
</template>