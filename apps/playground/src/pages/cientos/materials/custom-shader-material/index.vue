<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches } from '@tresjs/leches'
import Experiment from './CustomShaderMaterialDemo.vue'
</script>
<template>
  <TresLeches />
  <TresCanvas clear-color="#82DBC5">
    <Experiment />
  </TresCanvas>
</template>