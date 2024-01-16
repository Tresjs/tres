<script setup lang="ts">
import { watch } from 'vue'

const { selectedObject } = useDevtoolsHook()
</script>

<template>
  <InspectorBranch
    :key="selectedObject.uuid"
    :entry="selectedObject"
    :depth="0"
  />
</template>