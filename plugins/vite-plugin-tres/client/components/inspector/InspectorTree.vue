<script setup lang="ts">
const { internal } = useDevtoolsHook()
</script>

<template>
  <InspectorBranch
    :entry="internal.selectedObject"
    :depth="0"
  />
</template>