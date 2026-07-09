<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches } from '@tresjs/leches'
import Experiment from './MeshPortalMaterialDemo.vue'

const uuid = 'materials-mesh-portal'
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#050505">
    <Experiment />
  </TresCanvas>
</template>
